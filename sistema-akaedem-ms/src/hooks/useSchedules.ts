import { useState, useEffect } from 'react';
import { scheduleService, Schedule, CreateScheduleData, UpdateScheduleData } from '@/lib/api/services/schedule.service';
import { toast } from 'sonner';

interface UseSchedulesOptions {
  filters?: {
    class_id?: string;
    class_name?: string;
    course_id?: string;
    subject_id?: string;
    teacher_id?: string;
    type?: 'class' | 'exam';
    day_of_week?: string;
    academic_year?: string;
    is_active?: boolean;
  };
  autoFetch?: boolean;
}

export function useSchedules(options: UseSchedulesOptions = {}) {
  const { filters, autoFetch = true } = options;
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await scheduleService.listSchedules(filters);
      setSchedules(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao carregar horários';
      setError(errorMessage);
      toast.error(errorMessage);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchSchedules();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch, JSON.stringify(filters)]);

  const createSchedule = async (data: CreateScheduleData): Promise<Schedule> => {
    try {
      const schedule = await scheduleService.createSchedule(data);
      toast.success('Horário criado com sucesso!');
      await fetchSchedules();
      return schedule;
    } catch (err: any) {
      toast.error(err.message || 'Erro ao criar horário');
      throw err;
    }
  };

  const updateSchedule = async (id: string, data: UpdateScheduleData): Promise<Schedule> => {
    try {
      const schedule = await scheduleService.updateSchedule(id, data);
      toast.success('Horário atualizado com sucesso!');
      await fetchSchedules();
      return schedule;
    } catch (err: any) {
      toast.error(err.message || 'Erro ao atualizar horário');
      throw err;
    }
  };

  const deleteSchedule = async (id: string): Promise<void> => {
    try {
      await scheduleService.deleteSchedule(id);
      toast.success('Horário removido com sucesso!');
      await fetchSchedules();
    } catch (err: any) {
      toast.error(err.message || 'Erro ao remover horário');
      throw err;
    }
  };

  return {
    schedules,
    loading,
    error,
    fetchSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
}

