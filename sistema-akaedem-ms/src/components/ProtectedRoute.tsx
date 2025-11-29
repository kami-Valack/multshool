"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireCompleteProfile?: boolean; // Para escolas, verificar se perfil está completo
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true,
  requireCompleteProfile = true 
}: ProtectedRouteProps) {
  const { isAuthenticated, loading, user, profileComplete, checkProfileCompletion } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && requireAuth && !isAuthenticated) {
      router.push('/');
      return;
    }

    // Se for escola e perfil não estiver completo, redirecionar para completar perfil
    if (
      !loading && 
      isAuthenticated && 
      requireCompleteProfile &&
      user?.role === 'school' && 
      profileComplete === false
    ) {
      router.push('/admin/completar-perfil');
    }
  }, [isAuthenticated, loading, requireAuth, requireCompleteProfile, user, profileComplete, router]);

  // Verificar perfil ao carregar se for escola
  useEffect(() => {
    if (!loading && isAuthenticated && user?.role === 'school' && profileComplete === null) {
      checkProfileCompletion();
    }
  }, [loading, isAuthenticated, user, profileComplete, checkProfileCompletion]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">A carregar...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Se for escola e perfil não estiver completo, não renderizar conteúdo
  if (
    requireCompleteProfile &&
    user?.role === 'school' && 
    profileComplete === false
  ) {
    return null; // O redirecionamento será feito pelo useEffect
  }

  return <>{children}</>;
}

