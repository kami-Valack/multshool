import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface ClassStudent {
  id?: string;
  enrollment_id: string;
  name?: string;
  email?: string;
  number?: string;
}

export interface ClassSubject {
  id: string;
  name: string;
  code?: string;
}

export interface ClassTeacher {
  teacher_id: string;
  subject_id: string;
  subject_name?: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  course_id: string;
  course_name?: string;
  semester: number;
  academic_year: string;
  status: 'active' | 'completed';
  max_students?: number;
  student_count: number;
  students: ClassStudent[];
  subjects: ClassSubject[];
  teachers: ClassTeacher[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateClassData {
  name: string;
  course_id: string;
  semester: number;
  academic_year: string;
  status?: 'active' | 'completed';
  max_students?: number;
  student_ids?: string[];
  subject_ids?: string[];
}

export interface UpdateClassData {
  name?: string;
  course_id?: string;
  semester?: number;
  academic_year?: string;
  status?: 'active' | 'completed';
  max_students?: number;
  student_ids?: string[];
  subject_ids?: string[];
}

class ClassService {
  async listClasses(filters?: {
    course_id?: string;
    status?: 'active' | 'completed';
    academic_year?: string;
  }): Promise<SchoolClass[]> {
    const params = new URLSearchParams();
    if (filters?.course_id) params.append('course_id', filters.course_id);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.academic_year) params.append('academic_year', filters.academic_year);

    const queryString = params.toString();
    const url = queryString 
      ? `${API_ENDPOINTS.CLASSES.LIST}?${queryString}`
      : API_ENDPOINTS.CLASSES.LIST;

    const response = await schoolApiClient.get<{ classes: SchoolClass[] }>(url);

    if (response.status === 'success' && response.data) {
      const data = response.data as any;
      return Array.isArray(data.classes) ? data.classes : [];
    }

    throw new Error(response.message || 'Erro ao listar turmas');
  }

  async getClass(id: string): Promise<SchoolClass> {
    const response = await schoolApiClient.get<{ class: SchoolClass }>(
      API_ENDPOINTS.CLASSES.SHOW(id)
    );

    if (response.status === 'success' && response.data) {
      const data = response.data as any;
      return data.class || data;
    }

    throw new Error(response.message || 'Erro ao obter turma');
  }

  async createClass(data: CreateClassData): Promise<SchoolClass> {
    const response = await schoolApiClient.post<{ class: SchoolClass }>(
      API_ENDPOINTS.CLASSES.CREATE,
      data
    );

    if (response.status === 'success' && response.data) {
      const responseData = response.data as any;
      return responseData.class || responseData;
    }

    throw new Error(response.message || 'Erro ao criar turma');
  }

  async updateClass(id: string, data: UpdateClassData): Promise<SchoolClass> {
    const response = await schoolApiClient.put<{ class: SchoolClass }>(
      API_ENDPOINTS.CLASSES.UPDATE(id),
      data
    );

    if (response.status === 'success' && response.data) {
      const responseData = response.data as any;
      return responseData.class || responseData;
    }

    throw new Error(response.message || 'Erro ao atualizar turma');
  }

  async deleteClass(id: string): Promise<void> {
    const response = await schoolApiClient.delete(
      API_ENDPOINTS.CLASSES.DELETE(id)
    );

    if (response.status !== 'success') {
      throw new Error(response.message || 'Erro ao remover turma');
    }
  }
}

export const classService = new ClassService();

