"use client";

import { useRouter } from "next/navigation";

/**
 * Hook genérico para navegação entre páginas.
 * 
 * Uso:
 * const { navigateTo } = useNavigation();
 * navigateTo("/alguma/pagina");
 */
export const useNavigation = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    if (!path) return;
    router.push(path);
  };

  return { navigateTo };
};
