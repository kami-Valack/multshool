import { useState, useEffect } from 'react';
import { courseService, Course } from '@/lib/api/services/course.service';
import { toast } from 'sonner';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await courseService.listCourses();
      // Garante que sempre seja um array
      setCourses(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao carregar cursos';
      setError(errorMessage);
      toast.error(errorMessage);
      // Em caso de erro, garante que courses seja um array vazio
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    fetchCourses,
  };
}

