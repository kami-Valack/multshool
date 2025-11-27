import { useState, useEffect } from 'react';
import { Transaction } from '@/services/pdfService';

// Mock data - substituir por chamada à API
const mockMovimentosData: Transaction[] = [
  {
    title: "Propina Julho",
    date: "05.07.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
  {
    title: "Propina Junho", 
    date: "06.06.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
  {
    title: "Bônus plataforma",
    date: "06.06.2024", 
    amount: "+10.900,50 kz",
    isPositive: true,
  },
  {
    title: "Pag. Estágio",
    date: "06.06.2024",
    amount: "+45.600,50 kz", 
    isPositive: true,
  },
  {
    title: "Propina Maio",
    date: "01.05.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
];

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

export const useMovimentos = (userId?: string): UseMovimentosReturn => {
  const [movimentos, setMovimentos] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateSummary = (transactions: Transaction[]) => {
    const credits = transactions
      .filter(t => t.isPositive)
      .reduce((acc, t) => {
        const value = parseFloat(t.amount.replace(/[^\d,.-]/g, '').replace(',', '.'));
        return acc + Math.abs(value);
      }, 0);
    
    const debits = transactions
      .filter(t => !t.isPositive)
      .reduce((acc, t) => {
        const value = parseFloat(t.amount.replace(/[^\d,.-]/g, '').replace(',', '.'));
        return acc + Math.abs(value);
      }, 0);
    
    return {
      totalCredits: credits,
      totalDebits: debits,
      balance: credits - debits
    };
  };

  const fetchMovimentos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simula chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Em produção, substituir por:
      // const response = await api.get(`/users/${userId}/movimentos`);
      // setMovimentos(response.data);
      
      setMovimentos(mockMovimentosData);
    } catch (err) {
      setError('Erro ao carregar movimentos');
      console.error('Erro ao buscar movimentos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovimentos();
  }, [userId]);

  return {
    movimentos,
    loading,
    error,
    refetch: fetchMovimentos,
    summary: calculateSummary(movimentos)
  };
};