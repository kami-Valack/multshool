"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleCheck } from '@/hooks/useRoleCheck';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireCompleteProfile?: boolean; // Para escolas, verificar se perfil está completo
  allowedRoles?: string[]; // Roles permitidas para acessar esta rota (ex: ['school', 'admin'])
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true,
  requireCompleteProfile = true,
  allowedRoles = [] // Se vazio, não verifica role específica
}: ProtectedRouteProps) {
  const { isAuthenticated, loading, user, profileComplete, checkProfileCompletion } = useAuth();
  const router = useRouter();
  
  // Verificar role PRIMEIRO - se não tiver role correta, bloquear imediatamente
  const shouldCheckRole = allowedRoles.length > 0;
  const { hasAccess: hasRoleAccess, loading: roleLoading } = useRoleCheck({
    allowedRoles: shouldCheckRole ? allowedRoles : [],
    redirectTo: '/',
    showError: shouldCheckRole // Só redireciona se roles foram especificadas
  });
  
  // Se não tiver role correta, não verificar perfil completo
  const shouldCheckProfile = shouldCheckRole ? hasRoleAccess : true;

  useEffect(() => {
    if (!loading && requireAuth && !isAuthenticated) {
      router.push('/');
      return;
    }

    // Se tiver role correta E for escola E perfil não estiver completo, redirecionar para completar perfil
    // Mas apenas se requireCompleteProfile for true E não estiver na página de completar perfil
    if (
      !loading && 
      isAuthenticated && 
      shouldCheckProfile &&
      requireCompleteProfile &&
      user?.role === 'school' && 
      profileComplete === false &&
      typeof window !== 'undefined' &&
      !window.location.pathname.includes('/completar-perfil')
    ) {
      router.push('/admin/completar-perfil');
    }
  }, [isAuthenticated, loading, requireAuth, requireCompleteProfile, user, profileComplete, router, shouldCheckProfile]);

  // Verificar perfil ao carregar se for escola E tiver role correta
  useEffect(() => {
    if (!loading && isAuthenticated && shouldCheckProfile && user?.role === 'school' && profileComplete === null) {
      checkProfileCompletion();
    }
  }, [loading, isAuthenticated, user, profileComplete, checkProfileCompletion, shouldCheckProfile]);

  // Debug: Log do estado atual
  React.useEffect(() => {
    if (!loading && isAuthenticated && user) {
      console.log('[ProtectedRoute] Estado atual:', {
        userRole: user.role,
        allowedRoles,
        hasRoleAccess,
        profileComplete,
        requireCompleteProfile,
        pathname: typeof window !== 'undefined' ? window.location.pathname : 'N/A'
      });
    }
  }, [loading, isAuthenticated, user, allowedRoles, hasRoleAccess, profileComplete, requireCompleteProfile]);

  // Verificar se está carregando (auth ou role, se necessário)
  // IMPORTANTE: Se estiver verificando role, também aguardar o usuário estar disponível
  const isStillLoading = loading || (shouldCheckRole && (roleLoading || !user));
  
  if (isStillLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">A carregar...</p>
        </div>
      </div>
    );
  }

  // Verificar autenticação
  if (requireAuth && !isAuthenticated) {
    console.log('[ProtectedRoute] Usuário não autenticado');
    return null;
  }

  // Verificar role se especificada - BLOQUEAR se não tiver role correta
  // Mas apenas se o usuário já foi carregado
  if (shouldCheckRole && user && !hasRoleAccess) {
    console.log('[ProtectedRoute] Acesso negado por role:', {
      userRole: user?.role,
      allowedRoles,
      hasRoleAccess
    });
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Acesso Negado</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Você não tem permissão para acessar esta página.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Role requerida: {allowedRoles.join(' ou ')}
            {user?.role && ` | Sua role: ${user.role}`}
          </p>
        </div>
      </div>
    );
  }

  // Se tiver role correta E for escola E perfil não estiver completo, permitir acesso mas redirecionar
  // O redirecionamento será feito pelo useEffect apenas se requireCompleteProfile for true
  // Não bloquear completamente o acesso baseado em perfil, apenas redirecionar quando necessário
  // IMPORTANTE: Só bloquear se profileComplete for explicitamente false (não null)
  // Se for null, significa que ainda está verificando, então permitir acesso
  if (
    shouldCheckProfile &&
    requireCompleteProfile &&
    user?.role === 'school' && 
    profileComplete === false && // Apenas se for explicitamente false, não null
    typeof window !== 'undefined' &&
    !window.location.pathname.includes('/completar-perfil')
  ) {
    console.log('[ProtectedRoute] Perfil incompleto detectado, redirecionando...');
    // Retornar null enquanto redireciona
    return null;
  }
  
  // Se profileComplete for null (ainda não verificado), permitir acesso enquanto verifica
  // Isso evita bloqueios indevidos enquanto a verificação está em andamento
  // A verificação será feita em background e o redirecionamento acontecerá se necessário

  return <>{children}</>;
}

