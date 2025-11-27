import { useState, useEffect, useCallback } from 'react';
import {
  teacherAssignmentService,
  TeacherAssignment,
  CreateTeacherAssignmentData,
  BulkCreateTeacherAssignmentData,
  UpdateTeacherAssignmentData,
} from '@/lib/api/services/teacher-assignment.service';
import { toast } from 'sonner';

export function useTeacherAssignments(filters?: {
  teacher_id?: string;
  course_id?: string;
  subject_id?: string;
}) {
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await teacherAssignmentService.listAssignments(filters);
      setAssignments(data);
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao carregar atribuições';
      setError(errorMessage);
      toast.error(errorMessage);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  }, [filters?.teacher_id, filters?.course_id, filters?.subject_id]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const createAssignment = async (data: CreateTeacherAssignmentData) => {
    try {
      const newAssignment = await teacherAssignmentService.createAssignment(data);
      toast.success('Atribuição criada com sucesso!');
      await fetchAssignments(); // Refresh list
      return newAssignment;
    } catch (err: any) {
      toast.error(err.message || 'Erro ao criar atribuição');
      throw err;
    }
  };

  const bulkCreateAssignments = async (data: BulkCreateTeacherAssignmentData) => {
    try {
      const result = await teacherAssignmentService.bulkCreateAssignments(data);
      if (result.errors && result.errors.length > 0) {
        toast.warning(`${result.created.length} atribuição(ões) criada(s), ${result.errors.length} erro(s)`);
      } else {
        toast.success(`${result.created.length} atribuição(ões) criada(s) com sucesso!`);
      }
      await fetchAssignments(); // Refresh list
      return result;
    } catch (err: any) {
      toast.error(err.message || 'Erro ao criar atribuições');
      throw err;
    }
  };

  const updateAssignment = async (id: string, data: UpdateTeacherAssignmentData) => {
    try {
      const updatedAssignment = await teacherAssignmentService.updateAssignment(id, data);
      toast.success('Atribuição atualizada com sucesso!');
      await fetchAssignments(); // Refresh list
      return updatedAssignment;
    } catch (err: any) {
      toast.error(err.message || 'Erro ao atualizar atribuição');
      throw err;
    }
  };

  const deleteAssignment = async (id: string) => {
    try {
      await teacherAssignmentService.deleteAssignment(id);
      toast.success('Atribuição removida com sucesso!');
      await fetchAssignments(); // Refresh list
    } catch (err: any) {
      toast.error(err.message || 'Erro ao remover atribuição');
      throw err;
    }
  };

  return {
    assignments,
    loading,
    error,
    fetchAssignments,
    createAssignment,
    bulkCreateAssignments,
    updateAssignment,
    deleteAssignment,
  };
}

