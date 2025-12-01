import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface Schedule {
  id: string;
  class_id?: string;
  class_name: string;
  course_id: string;
  course?: {
    id: string;
    name: string;
  };
  subject_id: string;
  subject?: {
    id: string;
    name: string;
    code?: string;
  };
  teacher_id?: string;
  day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  day_of_week_portuguese?: string;
  start_time: string; // HH:mm format
  end_time: string; // HH:mm format
  room?: string;
  type: 'class' | 'exam';
  exam_type?: 'test' | 'final_exam' | 'recovery_exam' | 'practical_exam' | 'oral_exam';
  exam_type_portuguese?: string;
  exam_date?: string; // YYYY-MM-DD format
  academic_year: string;
  semester?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateScheduleData {
  class_id?: string;
  class_name: string;
  course_id: string;
  subject_id: string;
  teacher_id?: string;
  day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  start_time: string; // HH:mm format
  end_time: string; // HH:mm format
  room?: string;
  type: 'class' | 'exam';
  exam_type?: 'test' | 'final_exam' | 'recovery_exam' | 'practical_exam' | 'oral_exam';
  exam_date?: string; // YYYY-MM-DD format
  academic_year: string;
  semester?: number;
  is_active?: boolean;
}

export interface UpdateScheduleData extends Partial<CreateScheduleData> {}

class ScheduleService {
  /**
   * Lista todos os horários
   */
  async listSchedules(filters?: {
    class_id?: string;
    class_name?: string;
    course_id?: string;
    subject_id?: string;
    teacher_id?: string;
    type?: 'class' | 'exam';
    day_of_week?: string;
    academic_year?: string;
    is_active?: boolean;
  }): Promise<Schedule[]> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const endpoint = `/schedules${queryString ? `?${queryString}` : ''}`;
    
    const response = await schoolApiClient.get<{ schedules: Schedule[] }>(endpoint);

    if (response.status === 'success' && response.data) {
      const data = response.data as any;
      return Array.isArray(data.schedules) ? data.schedules : [];
    }

    throw new Error(response.message || 'Erro ao listar horários');
  }

  /**
   * Obtém um horário específico
   */
  async getSchedule(id: string): Promise<Schedule> {
    const response = await schoolApiClient.get<{ schedule: Schedule }>(`/schedules/${id}`);

    if (response.status === 'success' && response.data) {
      const data = response.data as any;
      return data.schedule || data;
    }

    throw new Error(response.message || 'Erro ao obter horário');
  }

  /**
   * Cria um novo horário
   */
  async createSchedule(data: CreateScheduleData): Promise<Schedule> {
    const response = await schoolApiClient.post<{ schedule: Schedule }>(
      '/schedules',
      data
    );

    if (response.status === 'success' && response.data) {
      const responseData = response.data as any;
      return responseData.schedule || responseData;
    }

    throw new Error(response.message || 'Erro ao criar horário');
  }

  /**
   * Atualiza um horário
   */
  async updateSchedule(id: string, data: UpdateScheduleData): Promise<Schedule> {
    const response = await schoolApiClient.put<{ schedule: Schedule }>(
      `/schedules/${id}`,
      data
    );

    if (response.status === 'success' && response.data) {
      const responseData = response.data as any;
      return responseData.schedule || responseData;
    }

    throw new Error(response.message || 'Erro ao atualizar horário');
  }

  /**
   * Remove um horário
   */
  async deleteSchedule(id: string): Promise<void> {
    const response = await schoolApiClient.delete(`/schedules/${id}`);

    if (response.status !== 'success') {
      throw new Error(response.message || 'Erro ao remover horário');
    }
  }
}

export const scheduleService = new ScheduleService();

