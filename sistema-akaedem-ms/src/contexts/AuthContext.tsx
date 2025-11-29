"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, LoginCredentials } from '@/lib/api/services/auth.service';
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
        const userData = await authService.getMe();
        setUser(userData);
        
        // Se for escola, verificar perfil completo
        if (userData.role === 'school') {
          await checkProfileCompletion();
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      // Limpa tokens inválidos
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verifica se o perfil está completo (apenas para escolas)
   */
  const checkProfileCompletion = async (userToCheck?: User | null) => {
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
      // Se o erro for INCOMPLETE_PROFILE (403), significa que o perfil está incompleto
      if (error.error_code === 'INCOMPLETE_PROFILE' || error.status === 403) {
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
          } catch {
            // Se falhar, assumir incompleto
            setProfileComplete(false);
          }
        }
      } else {
        console.error('Erro ao verificar perfil:', error);
        // Em caso de erro, assumir que está incompleto para forçar verificação
        setProfileComplete(false);
      }
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      const userData = await authService.getMe();
      setUser(userData);
      
      // Se for escola, verificar perfil completo IMEDIATAMENTE após login
      if (userData.role === 'school') {
        // Passar userData diretamente para garantir que a verificação use os dados corretos
        await checkProfileCompletion(userData);
      } else {
        setProfileComplete(true); // Não é escola, não precisa verificar
      }
    } catch (error: any) {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
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

