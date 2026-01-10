import { API_CONFIG } from './config';

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  error_code?: string;
  missing_fields?: string[];
  profile_completion_url?: string;
}

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string, timeout: number = API_CONFIG.TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Obtém o token de autenticação do localStorage
   */
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  /**
   * Obtém o refresh token do localStorage
   */
  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
  }

  /**
   * Configura os headers da requisição
   */
  private getHeaders(customHeaders?: HeadersInit, useAuth: boolean = true): HeadersInit {
    const headers: Record<string, string> = {
      ...(this.defaultHeaders as Record<string, string>),
      ...(customHeaders as Record<string, string> || {}),
    };

    if (useAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers as HeadersInit;
  }

  /**
   * Adiciona API Secret aos headers (para comunicação entre serviços)
   */
  private getHeadersWithSecret(customHeaders?: HeadersInit): HeadersInit {
    const headers = this.getHeaders(customHeaders, false) as Record<string, string>;
    if (API_CONFIG.API_SECRET) {
      headers['X-API-Secret'] = API_CONFIG.API_SECRET;
    }
    return headers as HeadersInit;
  }

  /**
   * Faz uma requisição HTTP
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    useAuth: boolean = true,
    useApiSecret: boolean = false
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = useApiSecret 
      ? this.getHeadersWithSecret(options.headers as HeadersInit)
      : this.getHeaders(options.headers as HeadersInit, useAuth);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Se não autorizado, tenta fazer refresh do token
      // IMPORTANTE: Não tenta refresh se não houver refresh token ou se for uma rota de login
      const isLoginRoute = endpoint.includes('/auth/login') || endpoint.includes('/auth/register');
      if (response.status === 401 && useAuth && !isLoginRoute && this.getRefreshToken()) {
        const refreshed = await this.refreshAuthToken();
        if (refreshed) {
          // Tenta novamente com o novo token
          const retryHeaders = useApiSecret
            ? this.getHeadersWithSecret(options.headers as HeadersInit)
            : this.getHeaders(options.headers as HeadersInit, true);
          
          const retryResponse = await fetch(url, {
            ...options,
            headers: retryHeaders,
            signal: controller.signal,
          });

          if (!retryResponse.ok) {
            throw await this.handleError(retryResponse);
          }

          const data = await retryResponse.json();
          return { status: 'success', data };
        }
      }

      if (!response.ok) {
        const error = await this.handleError(response);
        
        // Se for erro de perfil incompleto (403) e estiver no browser, redirecionar
        // Mas apenas se for especificamente INCOMPLETE_PROFILE, não qualquer 403
        // E apenas se não estiver já na página de completar perfil
        // NOTA: Removemos o redirecionamento automático para permitir que os componentes tratem o erro
        // O ProtectedRoute já cuida do redirecionamento quando necessário
        if (
          error.status === 403 && 
          error.error_code === 'INCOMPLETE_PROFILE' &&
          typeof window !== 'undefined' &&
          !window.location.pathname.includes('/completar-perfil') &&
          !window.location.pathname.includes('/admin/completar-perfil')
        ) {
          // Log apenas, não redirecionar automaticamente
          console.warn('[API Client] Perfil incompleto detectado, mas deixando o componente tratar o redirecionamento');
        }
        
        throw error;
      }

      const data = await response.json();
      return { status: 'success', data };
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw {
          message: 'Tempo de requisição excedido',
          status: 408,
        } as ApiError;
      }

      if (error.status) {
        throw error;
      }

      throw {
        message: error.message || 'Erro ao fazer requisição',
        status: 500,
      } as ApiError;
    }
  }

  /**
   * Trata erros da API
   */
  private async handleError(response: Response): Promise<ApiError> {
    let message = 'Erro ao processar requisição';
    let errors: Record<string, string[]> | undefined;
    let errorCode: string | undefined;

    try {
      const data = await response.json();
      message = data.message || data.error || message;
      errors = data.errors;
      errorCode = data.error_code; // Capturar error_code para INCOMPLETE_PROFILE
      
      // Mensagens específicas para códigos de status comuns
      if (!message || message === 'Erro ao processar requisição') {
        if (response.status === 401) {
          message = 'Credenciais inválidas. Verifique o utilizador e a palavra-passe.';
        } else if (response.status === 403) {
          message = 'Acesso negado. Você não tem permissão para realizar esta ação.';
        } else if (response.status === 404) {
          message = 'Recurso não encontrado.';
        } else if (response.status === 500) {
          message = 'Erro interno do servidor. Tente novamente mais tarde.';
        }
      }
      
      // Se for erro de perfil incompleto, incluir informações adicionais
      if (data.error_code === 'INCOMPLETE_PROFILE') {
        return {
          message,
          status: response.status,
          errors,
          error_code: errorCode,
          missing_fields: data.missing_fields,
          profile_completion_url: data.profile_completion_url,
        } as ApiError & { error_code?: string; missing_fields?: string[]; profile_completion_url?: string };
      }
    } catch {
      // Se não conseguir fazer parse do JSON, usar statusText ou mensagem padrão baseada no status
      if (response.status === 401) {
        message = 'Credenciais inválidas. Verifique o utilizador e a palavra-passe.';
      } else {
        message = response.statusText || message;
      }
    }

    // Garantir que sempre há uma mensagem
    if (!message || message.trim() === '') {
      if (response.status === 401) {
        message = 'Credenciais inválidas. Verifique o utilizador e a palavra-passe.';
      } else {
        message = 'Erro ao processar requisição';
      }
    }

    return {
      message,
      status: response.status,
      errors,
      error_code: errorCode,
    } as ApiError & { error_code?: string };
  }

  /**
   * Atualiza o token de autenticação
   */
  private async refreshAuthToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${API_CONFIG.USERS_API_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: this.defaultHeaders,
        body: JSON.stringify({ refreshToken: refreshToken }),
      });

      if (!response.ok) {
        // Se o refresh falhar, limpa os tokens
        this.clearAuth();
        return false;
      }

      const data = await response.json();
      if (data.status === 'success' && data.accessToken) {
        localStorage.setItem('auth_token', data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem('refresh_token', data.refreshToken);
        }
        return true;
      }

      return false;
    } catch {
      this.clearAuth();
      return false;
    }
  }

  /**
   * Limpa os tokens de autenticação
   */
  private clearAuth(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, useAuth: boolean = true, useApiSecret: boolean = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, useAuth, useApiSecret);
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data?: any,
    useAuth: boolean = true,
    useApiSecret: boolean = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      },
      useAuth,
      useApiSecret
    );
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data?: any,
    useAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      },
      useAuth
    );
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    data?: any,
    useAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
      },
      useAuth
    );
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, useAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' }, useAuth);
  }

  /**
   * Upload de arquivo
   */
  async upload<T>(
    endpoint: string,
    file: File,
    fieldName: string = 'file',
    additionalData?: Record<string, any>,
    useAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
        }
      });
    }

    const headers: HeadersInit = {};
    if (useAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw await this.handleError(response);
      }

      const data = await response.json();
      return { status: 'success', data };
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        message: error.message || 'Erro ao fazer upload',
        status: 500,
      } as ApiError;
    }
  }
}

// Instâncias do cliente para cada API
export const usersApiClient = new ApiClient(API_CONFIG.USERS_API_URL);
export const schoolApiClient = new ApiClient(API_CONFIG.SCHOOL_API_URL);
export const studentApiClient = new ApiClient(API_CONFIG.STUDENT_API_URL);
export const adminApiClient = new ApiClient(API_CONFIG.ADMIN_API_URL);

// Cliente padrão (para uso geral)
export const apiClient = schoolApiClient;

