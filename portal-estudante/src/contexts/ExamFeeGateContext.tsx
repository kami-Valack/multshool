"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  studentService,
  ExamFeesOverview,
  ExamFeeOverviewItem,
} from "@/services/studentService";

type ExamFeeGateContextValue = {
  overview: ExamFeesOverview | null;
  loading: boolean;
  pendingCount: number;
  paidCount: number;
  pending: ExamFeeOverviewItem[];
  paid: ExamFeeOverviewItem[];
  hasPendingExamFees: boolean;
  refresh: () => Promise<void>;
  isPathAllowedWhilePending: (path: string) => boolean;
};

const ExamFeeGateContext = createContext<ExamFeeGateContextValue | null>(null);

/** Rotas permitidas com taxas de exame por pagar (além de matricular-se em mais cursos). */
export function isPathAllowedWhilePending(path: string): boolean {
  const p = path.split("?")[0];
  if (p === "/estudante/dashboard" || p.startsWith("/estudante/dashboard/")) {
    return true;
  }
  if (p.startsWith("/curso/")) return true;
  if (p.startsWith("/instituicoes")) return true;
  if (p.startsWith("/estudante/cartoes/credito/pagamentos")) return true;
  if (p.startsWith("/estudante/cartoes/credito/propinas")) return true;
  if (p.startsWith("/estudante/cartoes/credito/movimentos")) return true;
  if (p.startsWith("/estudante/cartoes/estudante")) return true;
  if (p.startsWith("/estudante/perfil")) return true;
  if (p.startsWith("/candidato/documentos")) return true;
  if (p === "/login" || p === "/registo") return true;
  return false;
}

export function ExamFeeGateProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [overview, setOverview] = useState<ExamFeesOverview | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setOverview(null);
      return;
    }
    setLoading(true);
    try {
      const data = await studentService.getExamFeesOverview();
      setOverview(data);
    } catch (e) {
      console.error("Erro ao carregar overview de taxas de exame:", e);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (authLoading) return;
    refresh();
  }, [authLoading, refresh]);

  const pendingCount = overview?.pending_count ?? 0;
  const hasPendingExamFees = pendingCount > 0;

  useEffect(() => {
    if (authLoading || loading || !isAuthenticated) return;
    if (!hasPendingExamFees) return;
    if (isPathAllowedWhilePending(pathname)) return;
    router.replace("/estudante/dashboard");
  }, [
    authLoading,
    loading,
    isAuthenticated,
    hasPendingExamFees,
    pathname,
    router,
  ]);

  const value = useMemo<ExamFeeGateContextValue>(
    () => ({
      overview,
      loading,
      pendingCount,
      paidCount: overview?.paid_count ?? 0,
      pending: overview?.pending ?? [],
      paid: overview?.paid ?? [],
      hasPendingExamFees,
      refresh,
      isPathAllowedWhilePending,
    }),
    [overview, loading, pendingCount, hasPendingExamFees, refresh]
  );

  return (
    <ExamFeeGateContext.Provider value={value}>
      {children}
    </ExamFeeGateContext.Provider>
  );
}

const emptyOverview: ExamFeesOverview = {
  pending: [],
  paid: [],
  pending_count: 0,
  paid_count: 0,
};

export function useExamFeeGate() {
  const ctx = useContext(ExamFeeGateContext);
  if (!ctx) {
    return {
      overview: null,
      loading: false,
      pendingCount: 0,
      paidCount: 0,
      pending: emptyOverview.pending,
      paid: emptyOverview.paid,
      hasPendingExamFees: false,
      refresh: async () => undefined,
      isPathAllowedWhilePending,
    } satisfies ExamFeeGateContextValue;
  }
  return ctx;
}
