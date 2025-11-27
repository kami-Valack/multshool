"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, UserProfile } from '@/services/authService';
import { studentService, StudentProfile } from '@/services/studentService';

interface AuthContextType {
  user: UserProfile | StudentProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há token e carregar usuário
    const loadUser = async () => {
      if (authService.isAuthenticated()) {
        try {
          const profile = await studentService.getProfile();
          setUser(profile);
        } catch (error) {
          console.error('Erro ao carregar perfil:', error);
          authService.clearAuth();
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      
      // Buscar perfil completo do estudante
      const profile = await studentService.getProfile();
      setUser(profile);
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Limpar mesmo se houver erro
      authService.clearAuth();
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const profile = await studentService.getProfile();
      setUser(profile);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

