import { useState, useEffect, useCallback } from "react";
import { Transaction } from "@/services/pdfService";
import { studentService } from "@/services/studentService";
import { paymentService } from "@/services/paymentService";
import { formatLocalDate } from "@/utils/dates";

interface UseMovimentosReturn {
  movimentos: Transaction[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  summary: {
    totalCredits: number;
    totalDebits: number;
    balance: number;
  };
}

export const useMovimentos = (_userId?: string): UseMovimentosReturn => {
  const [movimentos, setMovimentos] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateSummary = (transactions: Transaction[]) => {
    const parse = (amount: string) =>
      Math.abs(parseFloat(amount.replace(/[^\d,.-]/g, "").replace(",", ".")) || 0);
    const credits = transactions
      .filter((t) => t.isPositive)
      .reduce((acc, t) => acc + parse(t.amount), 0);
    const debits = transactions
      .filter((t) => !t.isPositive)
      .reduce((acc, t) => acc + parse(t.amount), 0);
    return { totalCredits: credits, totalDebits: debits, balance: credits - debits };
  };

  const fetchMovimentos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [fees, intents] = await Promise.all([
        studentService.getFees().catch(() => []),
        paymentService.listPaymentIntents().catch(() => []),
      ]);

      const fromFees: Transaction[] = fees
        .filter((fee) => fee.status === "paid")
        .map((fee) => ({
          title: fee.description || "Propina",
          date: formatLocalDate(fee.updated_at || fee.due_date),
          amount: `-${Number(fee.amount).toLocaleString("pt-PT")} kz`,
          isPositive: false,
        }));

      const feeIds = new Set(fees.filter((f) => f.status === "paid").map((f) => f.id));
      const fromIntents: Transaction[] = intents
        .filter((intent) => intent.status === "paid" && !feeIds.has(intent.fee_id || ""))
        .map((intent) => ({
          title: intent.description || "Pagamento",
          date: formatLocalDate(intent.paid_at || intent.created_at),
          amount: `-${Number(intent.amount).toLocaleString("pt-PT")} kz`,
          isPositive: false,
        }));

      setMovimentos([...fromIntents, ...fromFees]);
    } catch (err) {
      setError("Erro ao carregar movimentos");
      console.error("Erro ao buscar movimentos:", err);
      setMovimentos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovimentos();
  }, [fetchMovimentos]);

  return {
    movimentos,
    loading,
    error,
    refetch: fetchMovimentos,
    summary: calculateSummary(movimentos),
  };
};
