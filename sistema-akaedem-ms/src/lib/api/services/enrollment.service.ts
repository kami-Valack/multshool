import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  status: 'pending' | 'approved' | 'rejected';
  enrollment_date?: string;
  class?: string;
  student_phone?: string;
  student_name?: string;
  student_email?: string;
  student?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  course?: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface UpdateEnrollmentData {
  class?: string;
  student_phone?: string;
  student_name?: string;
  student_email?: string;
}

export interface ExamRegistration {
  id: string;
  student_id: string;
  exam_id: string;
  status: 'pending' | 'approved' | 'rejected';
  registration_date?: string;
  student?: {
    id: string;
    name: string;
    email: string;
  };
  exam?: {
    id: string;
    name: string;
    exam_date: string;
  };
}

class EnrollmentService {
  /**
   * Lista matrículas de um curso
   */
  async listEnrollments(courseId: string, status?: string): Promise<{ enrollments: Enrollment[]; statistics?: any }> {
    const endpoint = status 
      ? `${API_ENDPOINTS.ENROLLMENTS.LIST(courseId)}?status=${status}`
      : API_ENDPOINTS.ENROLLMENTS.LIST(courseId);
    
    const response = await schoolApiClient.get<{ enrollments: Enrollment[]; statistics?: any }>(
      endpoint
    );

    if (response.status === 'success' && response.data) {
      // A API retorna { status: 'success', enrollments: [...], statistics: {...} }
      // O client.ts já envolve em { status: 'success', data: {...} }
      const data = response.data as any;
      return {
        enrollments: Array.isArray(data.enrollments) ? data.enrollments : [],
        statistics: data.statistics,
      };
    }

    throw new Error(response.message || 'Erro ao listar matrículas');
  }

  /**
   * Aprova uma matrícula
   */
  async approveEnrollment(enrollmentId: string): Promise<void> {
    const response = await schoolApiClient.post(
      API_ENDPOINTS.ENROLLMENTS.APPROVE(enrollmentId),
      {}
    );

    if (response.status !== 'success') {
      throw new Error(response.message || 'Erro ao aprovar matrícula');
    }
  }

  /**
   * Rejeita uma matrícula
   */
  async rejectEnrollment(enrollmentId: string, reason?: string): Promise<void> {
    const response = await schoolApiClient.post(
      API_ENDPOINTS.ENROLLMENTS.REJECT(enrollmentId),
      { reason }
    );

    if (response.status !== 'success') {
      throw new Error(response.message || 'Erro ao rejeitar matrícula');
    }
  }

  /**
   * Atualiza dados da matrícula
   */
  async updateEnrollment(enrollmentId: string, data: UpdateEnrollmentData): Promise<Enrollment> {
    const response = await schoolApiClient.put<Enrollment>(
      API_ENDPOINTS.ENROLLMENTS.UPDATE(enrollmentId),
      data
    );

    if (response.status === 'success' && response.data) {
      const enrollmentData = response.data as any;
      return enrollmentData.enrollment || enrollmentData;
    }

    throw new Error(response.message || 'Erro ao atualizar matrícula');
  }

  /**
   * Aprova uma inscrição em exame
   */
  async approveExamRegistration(registrationId: string): Promise<void> {
    const response = await schoolApiClient.post(
      API_ENDPOINTS.EXAM_REGISTRATIONS.APPROVE(registrationId),
      {}
    );

    if (response.status !== 'success') {
      throw new Error(response.message || 'Erro ao aprovar inscrição');
    }
  }

  /**
   * Rejeita uma inscrição em exame
   */
  async rejectExamRegistration(registrationId: string, reason?: string): Promise<void> {
    const response = await schoolApiClient.post(
      API_ENDPOINTS.EXAM_REGISTRATIONS.REJECT(registrationId),
      { reason }
    );

    if (response.status !== 'success') {
      throw new Error(response.message || 'Erro ao rejeitar inscrição');
    }
  }

  /**
   * Lista inscrições em exames de admissão
   */
  async listExamRegistrations(courseId: string, examId: string): Promise<ExamRegistration[]> {
    const response = await schoolApiClient.get<ExamRegistration[]>(
      API_ENDPOINTS.COURSES.EXAM_REGISTRATIONS(courseId, examId)
    );

    if (response.status === 'success' && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Erro ao listar inscrições');
  }
}

export const enrollmentService = new EnrollmentService();

