import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone?: string;
  school_id?: string;
  course_id?: string;
  department?: string;
  position?: string;
  contract_type?: string;
  address?: string;
  id_card?: string;
  status?: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
  course?: {
    id: string;
    name: string;
  };
}

export interface CreateTeacherData {
  name: string;
  email: string;
  phone?: string;
  course_id?: string;
  department?: string;
  position?: string;
  contract_type?: string;
  address?: string;
  id_card?: string;
}

export interface UpdateTeacherData {
  name?: string;
  email?: string;
  phone?: string;
  course_id?: string;
  department?: string;
  position?: string;
  contract_type?: string;
  address?: string;
  id_card?: string;
  status?: 'active' | 'inactive';
}

class TeacherService {
  /**
   * Lista todos os professores da escola
   */
  async listTeachers(): Promise<Teacher[]> {
    const response = await schoolApiClient.get<{ teachers: Teacher[] }>(API_ENDPOINTS.TEACHERS.LIST);

    if (response.status === 'success' && response.data) {
      // A API retorna { status: 'success', teachers: [...] }
      // O client.ts já envolve em { status: 'success', data: {...} }
      const data = response.data as any;
      return Array.isArray(data.teachers) ? data.teachers : [];
    }

    throw new Error(response.message || 'Erro ao listar professores');
  }

  /**
   * Obtém detalhes de um professor
   */
  async getTeacher(id: string): Promise<Teacher> {
    const response = await schoolApiClient.get<{ teacher: Teacher }>(
      `${API_ENDPOINTS.TEACHERS.LIST}/${id}`
    );

    if (response.status === 'success' && response.data) {
      // A API retorna { status: 'success', teacher: {...} }
      const data = response.data as any;
      return data.teacher || data;
    }

    throw new Error(response.message || 'Erro ao obter professor');
  }

  /**
   * Cria um novo professor
   */
  async createTeacher(data: CreateTeacherData): Promise<Teacher> {
    const response = await schoolApiClient.post<{ teacher: Teacher }>(
      API_ENDPOINTS.TEACHERS.LIST,
      data
    );

    if (response.status === 'success' && response.data) {
      // A API retorna { status: 'success', teacher: {...} }
      const responseData = response.data as any;
      return responseData.teacher || responseData;
    }

    throw new Error(response.message || 'Erro ao criar professor');
  }

  /**
   * Atualiza um professor
   */
  async updateTeacher(id: string, data: UpdateTeacherData): Promise<Teacher> {
    const response = await schoolApiClient.put<{ teacher: Teacher }>(
      `${API_ENDPOINTS.TEACHERS.LIST}/${id}`,
      data
    );

    if (response.status === 'success' && response.data) {
      // A API retorna { status: 'success', teacher: {...} }
      const responseData = response.data as any;
      return responseData.teacher || responseData;
    }

    throw new Error(response.message || 'Erro ao atualizar professor');
  }

  /**
   * Remove um professor
   */
  async deleteTeacher(id: string): Promise<void> {
    const response = await schoolApiClient.delete(
      `${API_ENDPOINTS.TEACHERS.LIST}/${id}`
    );

    if (response.status !== 'success') {
      throw new Error(response.message || 'Erro ao remover professor');
    }
  }

  /**
   * Lista estudantes vinculados a um professor
   */
  async getTeacherStudents(teacherId: string): Promise<any[]> {
    const response = await schoolApiClient.get<any[]>(
      API_ENDPOINTS.TEACHERS.STUDENTS(teacherId)
    );

    if (response.status === 'success' && response.data) {
      return Array.isArray(response.data) ? response.data : [];
    }

    throw new Error(response.message || 'Erro ao listar estudantes do professor');
  }
}

export const teacherService = new TeacherService();

