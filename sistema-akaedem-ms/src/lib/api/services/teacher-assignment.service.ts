import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface TeacherAssignment {
  id: string;
  teacher_id: string;
  teacher_name?: string;
  course_id: string;
  course_name?: string;
  subject_id: string;
  subject_name?: string;
  class: string;
  workload_hours: number;
  assignment_type: 'principal' | 'substituto';
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTeacherAssignmentData {
  teacher_id: string;
  course_id: string;
  subject_id: string;
  class: string;
  workload_hours: number;
  assignment_type: 'principal' | 'substituto';
}

export interface BulkCreateTeacherAssignmentData {
  teacher_id: string;
  assignments: Omit<CreateTeacherAssignmentData, 'teacher_id'>[];
}

export interface UpdateTeacherAssignmentData {
  course_id?: string;
  subject_id?: string;
  class?: string;
  workload_hours?: number;
  assignment_type?: 'principal' | 'substituto';
  is_active?: boolean;
}

class TeacherAssignmentService {
  async listAssignments(filters?: {
    teacher_id?: string;
    course_id?: string;
    subject_id?: string;
  }): Promise<TeacherAssignment[]> {
    const params = new URLSearchParams();
    if (filters?.teacher_id) params.append('teacher_id', filters.teacher_id);
    if (filters?.course_id) params.append('course_id', filters.course_id);
    if (filters?.subject_id) params.append('subject_id', filters.subject_id);

    const queryString = params.toString();
    const url = queryString 
      ? `${API_ENDPOINTS.TEACHER_ASSIGNMENTS.LIST}?${queryString}`
      : API_ENDPOINTS.TEACHER_ASSIGNMENTS.LIST;

    const response = await schoolApiClient.get<{ assignments: TeacherAssignment[] }>(url);

    if (response.status === 'success' && response.data) {
      const data = response.data as any;
      return Array.isArray(data.assignments) ? data.assignments : [];
    }

    throw new Error(response.message || 'Erro ao listar atribuições');
  }

  async getAssignment(id: string): Promise<TeacherAssignment> {
    const response = await schoolApiClient.get<{ assignment: TeacherAssignment }>(
      API_ENDPOINTS.TEACHER_ASSIGNMENTS.SHOW(id)
    );

    if (response.status === 'success' && response.data) {
      const data = response.data as any;
      return data.assignment || data;
    }

    throw new Error(response.message || 'Erro ao obter atribuição');
  }

  async createAssignment(data: CreateTeacherAssignmentData): Promise<TeacherAssignment> {
    const response = await schoolApiClient.post<{ assignment: TeacherAssignment }>(
      API_ENDPOINTS.TEACHER_ASSIGNMENTS.CREATE,
      data
    );

    if (response.status === 'success' && response.data) {
      const responseData = response.data as any;
      return responseData.assignment || responseData;
    }

    throw new Error(response.message || 'Erro ao criar atribuição');
  }

  async bulkCreateAssignments(data: BulkCreateTeacherAssignmentData): Promise<{
    created: TeacherAssignment[];
    errors?: Array<{ index: number; message: string }>;
  }> {
    const response = await schoolApiClient.post<{
      created: TeacherAssignment[];
      errors?: Array<{ index: number; message: string }>;
    }>(
      API_ENDPOINTS.TEACHER_ASSIGNMENTS.BULK_CREATE,
      data
    );

    if (response.status === 'success') {
      const responseData = response.data as any;
      return {
        created: responseData.created || [],
        errors: responseData.errors || [],
      };
    }

    throw new Error(response.message || 'Erro ao criar atribuições');
  }

  async updateAssignment(id: string, data: UpdateTeacherAssignmentData): Promise<TeacherAssignment> {
    const response = await schoolApiClient.put<{ assignment: TeacherAssignment }>(
      API_ENDPOINTS.TEACHER_ASSIGNMENTS.UPDATE(id),
      data
    );

    if (response.status === 'success' && response.data) {
      const responseData = response.data as any;
      return responseData.assignment || responseData;
    }

    throw new Error(response.message || 'Erro ao atualizar atribuição');
  }

  async deleteAssignment(id: string): Promise<void> {
    const response = await schoolApiClient.delete(
      API_ENDPOINTS.TEACHER_ASSIGNMENTS.DELETE(id)
    );

    if (response.status !== 'success') {
      throw new Error(response.message || 'Erro ao remover atribuição');
    }
  }
}

export const teacherAssignmentService = new TeacherAssignmentService();

