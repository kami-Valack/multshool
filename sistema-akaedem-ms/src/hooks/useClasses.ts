import { useState, useEffect, useCallback } from 'react';
import {
  classService,
  SchoolClass,
  CreateClassData,
  UpdateClassData,
} from '@/lib/api/services/class.service';
import { toast } from 'sonner';

export function useClasses(filters?: {
  course_id?: string;
  status?: 'active' | 'completed';
  academic_year?: string;
}) {
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await classService.listClasses(filters);
      setClasses(data);
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao carregar turmas';
      setError(errorMessage);
      toast.error(errorMessage);
      setClasses([]);
    } finally {
      setLoading(false);
    }
  }, [filters?.course_id, filters?.status, filters?.academic_year]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const createClass = async (data: CreateClassData) => {
    try {
      const newClass = await classService.createClass(data);
      toast.success('Turma criada com sucesso!');
      await fetchClasses(); // Refresh list
      return newClass;
    } catch (err: any) {
      toast.error(err.message || 'Erro ao criar turma');
      throw err;
    }
  };

  const updateClass = async (id: string, data: UpdateClassData) => {
    try {
      const updatedClass = await classService.updateClass(id, data);
      toast.success('Turma atualizada com sucesso!');
      await fetchClasses(); // Refresh list
      return updatedClass;
    } catch (err: any) {
      toast.error(err.message || 'Erro ao atualizar turma');
      throw err;
    }
  };

  const deleteClass = async (id: string) => {
    try {
      await classService.deleteClass(id);
      toast.success('Turma removida com sucesso!');
      await fetchClasses(); // Refresh list
    } catch (err: any) {
      toast.error(err.message || 'Erro ao remover turma');
      throw err;
    }
  };

  return {
    classes,
    loading,
    error,
    fetchClasses,
    createClass,
    updateClass,
    deleteClass,
  };
}

