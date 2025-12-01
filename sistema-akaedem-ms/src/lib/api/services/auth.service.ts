import { usersApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ProfileInfo {
  is_complete: boolean;
  completion_percentage: number;
  missing_fields: string[];
  message?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    email_verified?: boolean;
    student_id?: string;
  };
  profile?: ProfileInfo; // Informações do perfil (apenas para escolas)
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  email_verified: boolean;
  is_active?: boolean;
  school_id?: string;
  school?: any;
}

class AuthService {
  /**
   * Faz login
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await usersApiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
      false // Não usa auth para login
    );

    // A API retorna { status: 'success', accessToken, refreshToken, ... }
    // O client.ts já envolve em { status: 'success', data: {...} }
    if (response.status === 'success' && response.data) {
      const authData = response.data as any;
      
      console.log('AuthService.login - Dados recebidos:', {
        hasAccessToken: !!authData.accessToken,
        hasUser: !!authData.user,
        hasProfile: !!authData.profile,
        profile: authData.profile,
        userRole: authData.user?.role
      });
      
      // Salva tokens e role no localStorage para acesso imediato
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', authData.accessToken);
        localStorage.setItem('refresh_token', authData.refreshToken);
        // Salvar role para acesso imediato sem aguardar carregamento do user
        if (authData.user?.role) {
          localStorage.setItem('user_role', authData.user.role);
          console.log('[AuthService] Role salva no localStorage:', authData.user.role);
        }
      }
      
      const result = {
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
        expiresIn: authData.expiresIn,
        user: authData.user,
        profile: authData.profile, // Incluir informações de perfil se disponível
      };
      
      console.log('AuthService.login - Retornando:', {
        hasProfile: !!result.profile,
        profile: result.profile
      });
      
      return result;
    }

    throw new Error(response.message || 'Erro ao fazer login');
  }

  /**
   * Faz logout
   */
  async logout(): Promise<void> {
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem('refresh_token') 
      : null;

    if (refreshToken) {
      try {
        await usersApiClient.post(
          API_ENDPOINTS.AUTH.LOGOUT,
          { refreshToken: refreshToken },
          false
        );
      } catch (error) {
        console.error('Erro ao fazer logout na API:', error);
      }
    }

    // Limpa tokens e role do localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_role');
    }
  }

  /**
   * Obtém dados do usuário autenticado
   */
  async getMe(): Promise<User> {
    const response = await usersApiClient.get<User>(API_ENDPOINTS.AUTH.ME);

    if (response.status === 'success' && response.data) {
      const userData = response.data;
      
      // Salvar role no localStorage para acesso imediato
      if (typeof window !== 'undefined' && userData.role) {
        localStorage.setItem('user_role', userData.role);
        console.log('[AuthService] Role atualizada no localStorage:', userData.role);
      }
      
      return userData;
    }

    throw new Error(response.message || 'Erro ao obter dados do usuário');
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('auth_token');
  }

  /**
   * Obtém o token de autenticação
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }
}

export const authService = new AuthService();

