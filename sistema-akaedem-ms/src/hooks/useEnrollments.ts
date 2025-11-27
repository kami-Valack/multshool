import { useState, useEffect } from 'react';
import { enrollmentService, Enrollment, UpdateEnrollmentData } from '@/lib/api/services/enrollment.service';
import { toast } from 'sonner';

interface UseEnrollmentsOptions {
  courseId?: string;
  autoFetch?: boolean;
  status?: string;
}

export function useEnrollments(options: UseEnrollmentsOptions = {}) {
  const { courseId, autoFetch = true, status } = options;
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrollments = async () => {
    if (!courseId) {
      setError('courseId é obrigatório');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await enrollmentService.listEnrollments(courseId, status);
      // Garante que enrollments seja sempre um array
      const enrollmentsList = data.enrollments || [];
      setEnrollments(Array.isArray(enrollmentsList) ? enrollmentsList : []);
      setStatistics(data.statistics);
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao carregar matrículas';
      setError(errorMessage);
      toast.error(errorMessage);
      // Em caso de erro, garante que enrollments seja um array vazio
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && courseId) {
      fetchEnrollments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, autoFetch, status]);

  const approveEnrollment = async (enrollmentId: string) => {
    try {
      await enrollmentService.approveEnrollment(enrollmentId);
      toast.success('Matrícula aprovada com sucesso!');
      // Atualiza a lista
      if (courseId) {
        await fetchEnrollments();
      }
    } catch (err: any) {
      toast.error(err.message || 'Erro ao aprovar matrícula');
      throw err;
    }
  };

  const rejectEnrollment = async (enrollmentId: string, reason?: string) => {
    try {
      await enrollmentService.rejectEnrollment(enrollmentId, reason);
      toast.success('Matrícula rejeitada');
      // Atualiza a lista
      if (courseId) {
        await fetchEnrollments();
      }
    } catch (err: any) {
      toast.error(err.message || 'Erro ao rejeitar matrícula');
      throw err;
    }
  };

  const updateEnrollment = async (enrollmentId: string, data: UpdateEnrollmentData) => {
    try {
      await enrollmentService.updateEnrollment(enrollmentId, data);
      toast.success('Matrícula atualizada com sucesso!');
      // Atualiza a lista
      if (courseId) {
        await fetchEnrollments();
      }
    } catch (err: any) {
      toast.error(err.message || 'Erro ao atualizar matrícula');
      throw err;
    }
  };

  return {
    enrollments,
    statistics,
    loading,
    error,
    fetchEnrollments,
    approveEnrollment,
    rejectEnrollment,
    updateEnrollment,
  };
}
