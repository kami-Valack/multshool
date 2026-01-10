import { usersApiClient } from './apiClient';
import { ApiResponse } from './apiClient';

export interface LoginCredentials {
  email: string; // Pode ser email ou student_id
  password: string;
}

export interface LoginResponse {
  status: 'success';
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    student_id?: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface UserProfile {
  id: string;
  student_id?: string;
  email: string;
  name: string;
  role: string;
  email_verified: boolean;
  is_active: boolean;
  has_all_documents?: boolean;
  first_access?: boolean;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: 'success';
  message: string;
  user: {
    id: string;
    student_id?: string;
    email: string;
    name: string;
    role: string;
    email_verified: boolean;
  };
}

class AuthService {
  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await usersApiClient.post<RegisterResponse>(
        '/auth/register',
        data
      );

      return response;
    } catch (error: any) {
      // Re-throw com mensagem mais clara
      if (error.status === 'error') {
        throw error;
      }
      throw {
        status: 'error',
        message: error.message || 'Erro ao criar conta',
      };
    }
  }
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await usersApiClient.post<LoginResponse>(
        '/auth/login',
        credentials
      );

      if (response.status === 'success' && response.accessToken) {
        // Salvar tokens no localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      }

      return response;
    } catch (error: any) {
      // Extrair mensagem de erro de forma robusta
      let errorMessage = 'Credenciais inválidas. Verifique o utilizador e a palavra-passe.';
      
      if (error) {
        if (error.status === 'error' && error.message) {
          errorMessage = error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      }
      
      // Criar um novo erro com mensagem clara
      const loginError: any = {
        status: 'error',
        message: errorMessage,
      };
      throw loginError;
    }
  }

  async logout(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    
    if (refreshToken) {
      try {
        await usersApiClient.post('/auth/logout', {
          refresh_token: refreshToken,
        });
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }

    this.clearAuth();
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('Refresh token não encontrado');
    }

    const response = await usersApiClient.post<RefreshTokenResponse>(
      '/auth/refresh-token',
      { refresh_token: refreshToken }
    );

    if (response.accessToken && response.refreshToken) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      }
    }

    return response;
  }

  async getProfile(): Promise<UserProfile> {
    const response = await usersApiClient.get<ApiResponse<UserProfile>>(
      '/auth/me'
    );

    if (response.status === 'success' && response.user) {
      return response.user;
    }

    throw new Error('Erro ao obter perfil');
  }

  async requestPasswordReset(email: string): Promise<void> {
    await usersApiClient.post('/auth/password-reset/request', { email });
  }

  async resetPassword(
    token: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Promise<void> {
    await usersApiClient.post('/auth/password-reset/reset', {
      token,
      email,
      password,
      password_confirmation,
    });
  }

  async verifyEmail(token: string): Promise<void> {
    await usersApiClient.post('/auth/verify-email', { token });
  }

  // Getters para tokens e usuário
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  }

  getUser(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  clearAuth(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
}

export const authService = new AuthService();

