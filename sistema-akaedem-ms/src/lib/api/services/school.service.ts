import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface School {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status: 'pending' | 'approved' | 'rejected';
  logo?: string;
  photos?: string[];
  video?: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  name: string;
  description?: string;
  duration_months?: number;
  monthly_tuition?: number;
  image?: string;
  school_id: string;
}

class SchoolService {
  /**
   * Lista todas as escolas (requer API Secret)
   */
  async listSchools(): Promise<School[]> {
    const response = await schoolApiClient.get<School[]>(
      API_ENDPOINTS.SCHOOLS.LIST,
      false, // Não usa auth JWT
      true   // Usa API Secret
    );

    if (response.status === 'success' && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Erro ao listar escolas');
  }

  /**
   * Obtém detalhes de uma escola (requer API Secret)
   */
  async getSchool(id: string): Promise<School> {
    const response = await schoolApiClient.get<School>(
      API_ENDPOINTS.SCHOOLS.SHOW(id),
      false, // Não usa auth JWT
      true   // Usa API Secret
    );

    if (response.status === 'success' && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Erro ao obter escola');
  }

  /**
   * Lista cursos de uma escola (requer API Secret)
   */
  async getSchoolCourses(id: string): Promise<Course[]> {
    const response = await schoolApiClient.get<Course[]>(
      API_ENDPOINTS.SCHOOLS.COURSES(id),
      false, // Não usa auth JWT
      true   // Usa API Secret
    );

    if (response.status === 'success' && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Erro ao listar cursos');
  }

  /**
   * Aprova uma escola (requer API Secret)
   */
  async approveSchool(id: string): Promise<void> {
    const response = await schoolApiClient.post(
      API_ENDPOINTS.SCHOOLS.APPROVE(id),
      {},
      false, // Não usa auth JWT
      true   // Usa API Secret
    );

    if (response.status !== 'success') {
      throw new Error(response.message || 'Erro ao aprovar escola');
    }
  }

  /**
   * Rejeita uma escola (requer API Secret)
   */
  async rejectSchool(id: string, reason?: string): Promise<void> {
    const response = await schoolApiClient.post(
      API_ENDPOINTS.SCHOOLS.REJECT(id),
      { reason },
      false, // Não usa auth JWT
      true   // Usa API Secret
    );

    if (response.status !== 'success') {
      throw new Error(response.message || 'Erro ao rejeitar escola');
    }
  }
}

export const schoolService = new SchoolService();

