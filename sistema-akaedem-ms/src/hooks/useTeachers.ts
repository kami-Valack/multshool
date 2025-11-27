import { useState, useEffect } from 'react';
import { teacherService, Teacher, CreateTeacherData, UpdateTeacherData } from '@/lib/api/services/teacher.service';
import { toast } from 'sonner';

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeachers = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await teacherService.listTeachers();
      setTeachers(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao carregar professores';
      setError(errorMessage);
      // Não mostrar toast de erro se o endpoint ainda não existir
      if (!errorMessage.includes('404') && !errorMessage.includes('not found')) {
        toast.error(errorMessage);
      }
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const createTeacher = async (data: CreateTeacherData) => {
    try {
      const newTeacher = await teacherService.createTeacher(data);
      setTeachers(prev => [...prev, newTeacher]);
      toast.success('Professor criado com sucesso!');
      return newTeacher;
    } catch (err: any) {
      toast.error(err.message || 'Erro ao criar professor');
      throw err;
    }
  };

  const updateTeacher = async (id: string, data: UpdateTeacherData) => {
    try {
      const updatedTeacher = await teacherService.updateTeacher(id, data);
      setTeachers(prev => prev.map(t => t.id === id ? updatedTeacher : t));
      toast.success('Professor atualizado com sucesso!');
      return updatedTeacher;
    } catch (err: any) {
      toast.error(err.message || 'Erro ao atualizar professor');
      throw err;
    }
  };

  const deleteTeacher = async (id: string) => {
    try {
      await teacherService.deleteTeacher(id);
      setTeachers(prev => prev.filter(t => t.id !== id));
      toast.success('Professor removido com sucesso!');
    } catch (err: any) {
      toast.error(err.message || 'Erro ao remover professor');
      throw err;
    }
  };

  return {
    teachers,
    loading,
    error,
    fetchTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
  };
}

