import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface Course {
  id: string;
  name: string;
  description?: string;
  duration_months?: number;
  monthly_tuition?: number;
  image?: string;
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface CourseSubject {
  id: string;
  course_id: string;
  name: string;
  code?: string;
  semester?: number;
  trimester?: number;
  credits?: number;
  hours?: number;
}

export interface AdmissionExam {
  id: string;
  course_id: string;
  name: string;
  exam_date: string;
  registration_deadline: string;
  exam_fee?: number;
  max_candidates?: number;
  description?: string;
}

class CourseService {
  /**
   * Lista todos os cursos
   */
  async listCourses(): Promise<Course[]> {
    const response = await schoolApiClient.get<{ courses: Course[] }>(API_ENDPOINTS.COURSES.LIST);

    if (response.status === 'success' && response.data) {
      // A API retorna { status: 'success', courses: [...] }
      // O client.ts já envolve em { status: 'success', data: {...} }
      const data = response.data as any;
      return data.courses || data || [];
    }

    throw new Error(response.message || 'Erro ao listar cursos');
  }

  /**
   * Obtém detalhes de um curso
   */
  async getCourse(id: string, includeSubjects: boolean = false, includeExams: boolean = false): Promise<Course & {
    subjects?: CourseSubject[];
    admission_exams?: AdmissionExam[];
  }> {
    const params = new URLSearchParams();
    if (includeSubjects) params.append('include_subjects', 'true');
    if (includeExams) params.append('include_exams', 'true');

    const queryString = params.toString();
    const endpoint = `${API_ENDPOINTS.COURSES.SHOW(id)}${queryString ? `?${queryString}` : ''}`;

    const response = await schoolApiClient.get<Course & {
      subjects?: CourseSubject[];
      admission_exams?: AdmissionExam[];
    }>(endpoint);

    if (response.status === 'success' && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Erro ao obter curso');
  }

  /**
   * Lista disciplinas de um curso
   */
  async getCourseSubjects(courseId: string): Promise<CourseSubject[]> {
    const response = await schoolApiClient.get<{ subjects: CourseSubject[] }>(
      API_ENDPOINTS.COURSES.SUBJECTS(courseId)
    );

    if (response.status === 'success' && response.data) {
      const data = response.data as any;
      // A API retorna { status: 'success', subjects: [...] }
      // O client.ts já envolve em { status: 'success', data: {...} }
      const subjects = data.subjects || data || [];
      return Array.isArray(subjects) ? subjects : [];
    }

    throw new Error(response.message || 'Erro ao listar disciplinas');
  }

  /**
   * Lista exames de admissão de um curso
   */
  async getAdmissionExams(courseId: string): Promise<AdmissionExam[]> {
    const response = await schoolApiClient.get<AdmissionExam[]>(
      API_ENDPOINTS.COURSES.ADMISSION_EXAMS(courseId)
    );

    if (response.status === 'success' && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Erro ao listar exames');
  }
}

export const courseService = new CourseService();

