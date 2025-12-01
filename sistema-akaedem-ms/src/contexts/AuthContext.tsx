"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authService, User, LoginCredentials, ProfileInfo } from '@/lib/api/services/auth.service';
import { profileService, ProfileCompletionStatus } from '@/lib/api/services/profile.service';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  profileComplete: boolean | null; // null = não verificado ainda, true/false = verificado
  profileStatus: ProfileCompletionStatus | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  checkProfileCompletion: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null);
  const [profileStatus, setProfileStatus] = useState<ProfileCompletionStatus | null>(null);

  /**
   * Verifica autenticação ao carregar
   */
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        // Buscar dados completos do usuário
        // A role já está no localStorage e será usada pelo useRoleCheck enquanto aguarda
        const userData = await authService.getMe();
        setUser(userData);
        
        // Se for escola, verificar perfil completo
        if (userData.role === 'school') {
          await checkProfileCompletion();
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      // Limpa tokens e role inválidos
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_role');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verifica se o perfil está completo (apenas para escolas)
   */
  const checkProfileCompletion = useCallback(async (userToCheck?: User | null) => {
    try {
      const userToVerify = userToCheck || user;
      
      if (userToVerify?.role !== 'school') {
        setProfileComplete(true); // Não é escola, não precisa verificar
        return;
      }

      const status = await profileService.checkCompletion();
      setProfileStatus(status);
      setProfileComplete(status.is_complete);
    } catch (error: any) {
      // Se o erro for INCOMPLETE_PROFILE (403) com código específico, significa que o perfil está incompleto
      if (error.error_code === 'INCOMPLETE_PROFILE' || (error.status === 403 && error.message?.includes('obrigatório preencher'))) {
        setProfileComplete(false);
        // Tentar extrair dados do erro
        if (error.missing_fields) {
          setProfileStatus({
            is_complete: false,
            missing_fields: error.missing_fields,
            completion_percentage: 0,
            message: error.message || 'Perfil incompleto',
          });
        } else {
          // Se não tiver missing_fields no erro, tentar buscar do endpoint
          try {
            const status = await profileService.checkCompletion();
            setProfileStatus(status);
            setProfileComplete(status.is_complete);
          } catch (innerError: any) {
            // Se falhar novamente, verificar se é realmente INCOMPLETE_PROFILE
            if (innerError.error_code === 'INCOMPLETE_PROFILE' || (innerError.status === 403 && innerError.message?.includes('obrigatório preencher'))) {
              setProfileComplete(false);
            } else {
              // Se for outro tipo de erro (rede, servidor, etc), não assumir incompleto
              // Manter o estado atual ou assumir completo para não bloquear acesso
              console.warn('Erro ao verificar perfil (não é INCOMPLETE_PROFILE):', innerError);
              // Não alterar profileComplete para não bloquear acesso indevidamente
            }
          }
        }
      } else {
        console.warn('[AuthContext] Erro ao verificar perfil (não relacionado a perfil incompleto):', error);
        // Em caso de erro que não seja INCOMPLETE_PROFILE, não assumir que está incompleto
        // Isso evita bloquear acesso por erros de rede ou servidor
        // Se profileComplete ainda não foi setado (null), assumir true para não bloquear acesso
        if (profileComplete === null) {
          console.log('[AuthContext] Erro na verificação de perfil, assumindo completo para não bloquear acesso');
          setProfileComplete(true);
        } else {
          // Se já foi setado antes, manter o valor atual (não alterar)
          console.log('[AuthContext] Mantendo estado atual de profileComplete:', profileComplete);
        }
      }
    }
  }, [user]);

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log('AuthContext.login - Iniciando login...');
      const response = await authService.login(credentials);
      console.log('AuthContext.login - Resposta do login:', { 
        hasProfile: !!response.profile, 
        profile: response.profile,
        user: response.user
      });
      
      // Usar o user da resposta do login ao invés de chamar getMe() novamente
      // Isso garante que temos os dados corretos e evita uma requisição extra
      const userData: User = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        email_verified: response.user.email_verified || false,
        is_active: true,
      };
      
      console.log('AuthContext.login - Dados do usuário:', { role: userData.role });
      
      // Salvar role no localStorage para acesso imediato
      if (typeof window !== 'undefined' && userData.role) {
        localStorage.setItem('user_role', userData.role);
        console.log('[AuthContext] Role salva no localStorage após login:', userData.role);
      }
      
      setUser(userData);
      
      // Se for escola, usar informações de perfil da resposta do login
      if (userData.role === 'school') {
        console.log('AuthContext.login - É escola, verificando perfil...');
        
        // Se a resposta do login já contém informações de perfil, usar diretamente
        if (response.profile) {
          const profileInfo = response.profile;
          console.log('AuthContext.login - Perfil recebido da API:', profileInfo);
          console.log('AuthContext.login - is_complete:', profileInfo.is_complete);
          setProfileComplete(profileInfo.is_complete);
          setProfileStatus({
            is_complete: profileInfo.is_complete,
            missing_fields: profileInfo.missing_fields || [],
            completion_percentage: profileInfo.completion_percentage || 0,
            message: profileInfo.message || 'Perfil incompleto',
          });
          console.log('AuthContext.login - profileComplete setado para:', profileInfo.is_complete);
        } else {
          // Se não tiver na resposta, verificar manualmente (fallback)
          console.log('AuthContext.login - Perfil não veio na resposta, verificando manualmente...');
          await checkProfileCompletion(userData);
        }
      } else {
        console.log('AuthContext.login - Não é escola, setando profileComplete = true');
        setProfileComplete(true); // Não é escola, não precisa verificar
      }
    } catch (error: any) {
      console.error('AuthContext.login - Erro no login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      // Limpar estados
      setUser(null);
      setProfileComplete(null);
      setProfileStatus(null);
      // Limpar role do localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user_role');
      }
      // Redirecionar para login
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, limpar estados e redirecionar
      setUser(null);
      setProfileComplete(null);
      setProfileStatus(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user_role');
        window.location.href = '/';
      }
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await authService.getMe();
      setUser(userData);
      
      // Se for escola, verificar perfil completo após atualizar
      if (userData.role === 'school') {
        await checkProfileCompletion();
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      throw error;
    }
  };

  // isAuthenticated deve ser true apenas se user existir E não estiver carregando
  const isAuthenticated = !!user && !loading;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        profileComplete,
        profileStatus,
        login,
        logout,
        refreshUser,
        checkProfileCompletion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

