import { studentApiClient } from './apiClient';
import { ApiResponse } from './apiClient';
import { API_CONFIG } from '@/config/api';

export interface StudentProfile {
  id: string;
  student_id: string;
  email: string;
  name: string;
  role: string;
  email_verified: boolean;
  is_active: boolean;
  has_all_documents: boolean;
  first_access: boolean;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  course?: {
    id: string;
    name: string;
    institution_id: string;
  };
  admission_exam?: {
    id: string;
    name: string;
  };
}

export interface Institution {
  id: string;
  name: string;
  short_name?: string;
  type: string;
  email?: string;
  phone?: string;
  address?: string;
  logo?: string;
  color?: string;
}

export interface Course {
  id: string;
  name: string;
  description?: string;
  code?: string;
  education_level: 'medio' | 'superior';
  class_level?: number;
  year_level?: number;
  duration_months: number;
  monthly_tuition: number;
  price?: number;
  is_active: boolean;
  faculty?: string;
  school_id: string;
  school?: {
    id: string;
    name: string;
    short_name?: string;
  };
  subjects?: Array<{
    id: string;
    name: string;
    code?: string;
    hours?: number;
    semester?: number;
    trimester?: number;
    credits?: number;
    description?: string;
  }>;
  admission_exams?: Array<{
    id: string;
    name: string;
    date: string;
  }>;
  image_url?: string;
  tuition_info?: {
    monthly_tuition: number;
    total_tuition: number;
    duration_months: number;
    formatted_class?: string;
    formatted_year?: string;
    education_level: string;
  };
}

export interface Document {
  id: string;
  type: string;
  name: string;
  file_path: string;
  status: 'pending' | 'approved' | 'rejected';
  uploaded_at: string;
}

export interface ExamRegistration {
  id: string;
  student_id: string;
  exam_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  exam?: {
    id: string;
    name: string;
    date: string;
  };
}

export interface Grade {
  id: string;
  student_id: string;
  course_id: string;
  subject: string;
  grade: number;
  year: number;
  semester: number;
  created_at: string;
  updated_at: string;
}

export interface Fee {
  id: string;
  student_id: string;
  enrollment_id?: string;
  amount: number;
  due_date: string;
  status: 'pending' | 'paid' | 'overdue';
  description: string;
  created_at: string;
  updated_at?: string;
}

class StudentService {
  // Perfil do estudante
  async getProfile(): Promise<StudentProfile> {
    const response = await studentApiClient.get<ApiResponse<StudentProfile>>(
      '/me'
    );

    if (response.status === 'success' && response.user) {
      return response.user;
    }

    throw new Error('Erro ao obter perfil do estudante');
  }

  // Documentos
  async getDocuments(): Promise<Document[]> {
    const response = await studentApiClient.get<ApiResponse<Document[]>>(
      '/documents'
    );

    if (response.status === 'success' && response.documents) {
      return response.documents;
    }

    return [];
  }

  async uploadDocument(
    file: File,
    type: string,
    onProgress?: (progress: number) => void
  ): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await studentApiClient.upload<ApiResponse<Document>>(
      '/documents/upload',
      formData,
      onProgress
    );

    if (response.status === 'success' && response.document) {
      return response.document;
    }

    throw new Error(response.message || 'Erro ao fazer upload do documento');
  }

  async checkFirstAccess(): Promise<{ first_access: boolean }> {
    const response = await studentApiClient.get<ApiResponse<{ first_access: boolean }>>(
      '/documents/check-first-access'
    );

    if (response.status === 'success' && response.first_access !== undefined) {
      return { first_access: response.first_access };
    }

    return { first_access: false };
  }

  // Instituições (rota pública - não requer autenticação)
  async getInstitutions(params?: { institution_type?: string; status?: string }): Promise<Institution[]> {
    try {
      // Usar fetch diretamente sem token, pois é uma rota pública
      const baseURL = API_CONFIG.STUDENT_API;
      const queryString = params
        ? '?' + new URLSearchParams(params as Record<string, string>).toString()
        : '';
      
      const response = await fetch(`${baseURL}/institutions${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar instituições: ${response.statusText}`);
      }

      const data: ApiResponse<Institution[]> = await response.json();

      if (data.status === 'success' && data.institutions) {
        return data.institutions;
      }

      return [];
    } catch (error: any) {
      console.error('Erro ao buscar instituições:', error);
      return [];
    }
  }

  // Obter detalhes de uma instituição (rota pública - não requer autenticação)
  async getInstitution(id: string, includeCourses: boolean = true): Promise<any> {
    try {
      // Usar fetch diretamente sem token, pois é uma rota pública
      const baseURL = API_CONFIG.STUDENT_API;
      const queryString = includeCourses ? '?include_courses=true' : '';
      
      const response = await fetch(`${baseURL}/institutions/${id}${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Instituição não encontrada');
        }
        throw new Error(`Erro ao buscar instituição: ${response.statusText}`);
      }

      const data: ApiResponse<any> = await response.json();

      if (data.status === 'success' && data.institution) {
        return data.institution;
      }

      throw new Error('Erro ao obter instituição');
    } catch (error: any) {
      console.error('Erro ao buscar instituição:', error);
      throw error;
    }
  }

  // Cursos (rota pública - não requer autenticação)
  async getCourse(id: string, includeSubjects: boolean = false, includeExams: boolean = false): Promise<Course> {
    try {
      const params = new URLSearchParams();
      if (includeSubjects) params.append('include_subjects', 'true');
      if (includeExams) params.append('include_exams', 'true');
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const url = `${API_CONFIG.STUDENT_API}/courses/${id}${queryString}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Curso não encontrado');
        }
        throw new Error(`Erro ao obter curso: ${response.statusText}`);
      }

      const data: ApiResponse<any> = await response.json();

      if (data.status === 'success' && data.course) {
        return data.course;
      }

      throw new Error('Erro ao obter curso');
    } catch (error: any) {
      console.error('Erro ao buscar curso:', error);
      throw error;
    }
  }

  // Matrículas
  async getEnrollments(status?: 'pending' | 'approved' | 'rejected'): Promise<Enrollment[]> {
    const params = status ? { status } : {};
    const response = await studentApiClient.get<ApiResponse<Enrollment[]>>(
      '/enrollments',
      params
    );

    if (response.status === 'success' && response.enrollments) {
      return response.enrollments;
    }

    return [];
  }

  async createEnrollment(
    courseId: string,
    admissionExamId?: string
  ): Promise<Enrollment> {
    try {
      const response = await studentApiClient.post<any>(
        '/enrollments',
        {
          course_id: courseId,
          admission_exam_id: admissionExamId,
        }
      );

      // A API retorna { status: 'success', enrollment: {...}, message: '...' }
      if (response.status === 'success' && response.enrollment) {
        return response.enrollment;
      }

      // Se a resposta não tiver o formato esperado, tentar outros formatos
      if (response.enrollment) {
        return response.enrollment;
      }

      // Se a resposta tem status de erro
      if (response.status === 'error') {
        throw {
          status: 'error',
          message: response.message || 'Erro ao criar matrícula',
          errors: response.errors,
        };
      }

      throw new Error(response.message || 'Erro ao criar matrícula');
    } catch (error: any) {
      // Re-throw o erro para que seja tratado no componente
      throw error;
    }
  }

  // Inscrições em Exames
  async getExamRegistrations(): Promise<ExamRegistration[]> {
    const response = await studentApiClient.get<ApiResponse<ExamRegistration[]>>(
      '/exam-registrations'
    );

    if (response.status === 'success' && response.exam_registrations) {
      return response.exam_registrations;
    }

    return [];
  }

  async createExamRegistration(examId: string): Promise<ExamRegistration> {
    const response = await studentApiClient.post<ApiResponse<ExamRegistration>>(
      '/exam-registrations',
      {
        exam_id: examId,
      }
    );

    if (response.status === 'success' && response.exam_registration) {
      return response.exam_registration;
    }

    throw new Error(response.message || 'Erro ao inscrever-se no exame');
  }

  // Notas (Grades) - se disponível via API
  async getGrades(): Promise<Grade[]> {
    try {
      // Tentar buscar notas - pode não estar disponível ainda
      const response = await studentApiClient.get<ApiResponse<Grade[]>>('/grades');
      
      if (response.status === 'success' && response.grades) {
        return response.grades;
      }
      
      return [];
    } catch (error) {
      // Se o endpoint não existir, retornar array vazio
      console.warn('Endpoint de notas não disponível:', error);
      return [];
    }
  }

  // Propinas/Fees - se disponível via API
  async getFees(): Promise<Fee[]> {
    try {
      const response = await studentApiClient.get<ApiResponse<Fee[]>>('/fees');
      
      if (response.status === 'success' && response.fees) {
        return response.fees;
      }
      
      return [];
    } catch (error) {
      console.warn('Endpoint de propinas não disponível:', error);
      return [];
    }
  }
}

export const studentService = new StudentService();

