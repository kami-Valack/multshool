"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRoleCheck } from "@/hooks/useRoleCheck";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireCompleteProfile?: boolean;
  allowedRoles?: string[];
}

function LoadingScreen({ label = "A carregar..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requireCompleteProfile = true,
  allowedRoles = [],
}: ProtectedRouteProps) {
  const {
    isAuthenticated,
    loading,
    user,
    profileComplete,
    checkProfileCompletion,
  } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const shouldCheckRole = allowedRoles.length > 0;
  const { hasAccess: hasRoleAccess, loading: roleLoading } = useRoleCheck({
    allowedRoles: shouldCheckRole ? allowedRoles : [],
    redirectTo: "/",
    showError: shouldCheckRole,
  });

  const shouldCheckProfile = shouldCheckRole ? hasRoleAccess : true;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || loading) return;

    if (requireAuth && !isAuthenticated) {
      router.replace("/");
      return;
    }

    if (
      isAuthenticated &&
      shouldCheckProfile &&
      requireCompleteProfile &&
      user?.role === "school" &&
      profileComplete === false &&
      !pathname.includes("/completar-perfil")
    ) {
      router.replace("/admin/completar-perfil");
    }
  }, [
    isAuthenticated,
    loading,
    requireAuth,
    requireCompleteProfile,
    user,
    profileComplete,
    router,
    shouldCheckProfile,
    isMounted,
    pathname,
  ]);

  useEffect(() => {
    if (
      !loading &&
      isAuthenticated &&
      shouldCheckProfile &&
      user?.role === "school" &&
      profileComplete === null
    ) {
      void checkProfileCompletion(user);
    }
  }, [
    loading,
    isAuthenticated,
    user,
    profileComplete,
    checkProfileCompletion,
    shouldCheckProfile,
  ]);

  // Evitar flash: não renderizar children até montar + auth estabilizar
  if (!isMounted || loading || (shouldCheckRole && roleLoading)) {
    return <LoadingScreen />;
  }

  if (requireAuth && !isAuthenticated) {
    return <LoadingScreen label="A redirecionar..." />;
  }

  if (shouldCheckRole && user && !hasRoleAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Acesso Negado
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Não tem permissão para aceder a esta página.
          </p>
        </div>
      </div>
    );
  }

  if (
    shouldCheckProfile &&
    requireCompleteProfile &&
    user?.role === "school" &&
    profileComplete === false &&
    !pathname.includes("/completar-perfil")
  ) {
    return <LoadingScreen label="A redirecionar para completar perfil..." />;
  }

  return <>{children}</>;
}
