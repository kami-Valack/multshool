"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface UseRoleCheckOptions {
  allowedRoles: string[];
  redirectTo?: string;
  showError?: boolean;
}

/**
 * Hook para verificar se o usuário tem a role necessária para acessar uma página
 * 
 * @param allowedRoles - Array de roles permitidas (ex: ['school', 'admin'])
 * @param redirectTo - Rota para redirecionar se não tiver permissão (padrão: '/')
 * @param showError - Se deve mostrar mensagem de erro (padrão: true)
 * 
 * @returns { hasAccess: boolean, loading: boolean }
 */
export function useRoleCheck({ 
  allowedRoles, 
  redirectTo = '/',
  showError = true 
}: UseRoleCheckOptions) {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Função para obter role do localStorage como fallback
  const getRoleFromStorage = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user_role');
    }
    return null;
  };

  useEffect(() => {
    // Se não há roles especificadas, permitir acesso (não verificar role)
    if (allowedRoles.length === 0) {
      setHasAccess(true);
      setLoading(false);
      return;
    }

    // Aguardar autenticação carregar E usuário estar disponível
    if (authLoading) {
      return;
    }

    // Se não estiver autenticado, não tem acesso
    if (!isAuthenticated) {
      setHasAccess(false);
      setLoading(false);
      if (showError) {
        router.push(redirectTo);
      }
      return;
    }

    // IMPORTANTE: Se user ainda não estiver disponível, tentar obter role do localStorage
    // Isso permite verificação imediata sem aguardar carregamento completo
    let userRole: string | null = null;
    
    if (user?.role) {
      userRole = user.role;
    } else if (isAuthenticated) {
      // Se autenticado mas user ainda não carregou, usar role do localStorage
      userRole = getRoleFromStorage();
      if (userRole) {
        console.log('[useRoleCheck] Usando role do localStorage:', userRole);
      }
    }
    
    // Se ainda não tiver role e estiver autenticado, aguardar um pouco
    if (!userRole && isAuthenticated) {
      console.log('[useRoleCheck] Aguardando role do usuário...');
      // Não bloquear ainda, apenas aguardar
      return;
    }
    
    // Se não estiver autenticado e não tiver role, bloquear
    if (!userRole) {
      setHasAccess(false);
      setLoading(false);
      if (showError) {
        router.push(redirectTo);
      }
      return;
    }

    const hasRequiredRole = allowedRoles.includes(userRole);

    console.log('[useRoleCheck] Verificando role:', {
      userRole,
      allowedRoles,
      hasRequiredRole,
      userId: user?.id || 'N/A',
      userEmail: user?.email || 'N/A'
    });

    setHasAccess(hasRequiredRole);
    setLoading(false);

    // Se não tiver a role necessária, redirecionar
    if (!hasRequiredRole) {
      if (showError) {
        // Mostrar mensagem de erro (pode ser implementado com toast/alert)
        console.error(`[useRoleCheck] Acesso negado. Role requerida: ${allowedRoles.join(' ou ')}. Role atual: ${userRole}`);
        router.push(redirectTo);
      }
    } else {
      console.log('[useRoleCheck] Acesso permitido - role correta');
    }
  }, [user, authLoading, isAuthenticated, allowedRoles, redirectTo, router, showError]);

  return { hasAccess, loading: loading || authLoading };
}

