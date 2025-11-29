import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface Course {
  id: string;
  name: string;
  description?: string;
  code?: string;
  education_level?: 'medio' | 'superior';
  class_level?: number; // 10, 11, 12, 13 para ensino médio
  year_level?: number; // Ano para ensino superior
  duration_months?: number;
  monthly_tuition?: number;
  price?: number;
  is_active?: boolean;
  faculty?: string;
  image?: string;
  image_path?: string;
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCourseData {
  name: string;
  description?: string;
  code?: string;
  education_level: 'medio' | 'superior';
  class_level?: number; // Obrigatório se education_level='medio'
  year_level?: number; // Obrigatório se education_level='superior'
  duration_months?: number; // Opcional, mas para medio é sempre 9
  monthly_tuition: number;
  price?: number;
  is_active?: boolean;
  faculty?: string;
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

  /**
   * Cria um novo curso
   */
  async createCourse(data: CreateCourseData): Promise<Course & {
    tuition_info?: {
      monthly_tuition: number;
      total_tuition: number;
      duration_months: number;
      formatted_class?: string;
      formatted_year?: string;
    };
  }> {
    const response = await schoolApiClient.post<{
      course: Course;
      tuition_info?: {
        monthly_tuition: number;
        total_tuition: number;
        duration_months: number;
        formatted_class?: string;
        formatted_year?: string;
      };
    }>(API_ENDPOINTS.COURSES.LIST, data);

    if (response.status === 'success' && response.data) {
      const data = response.data as any;
      return {
        ...data.course,
        tuition_info: data.tuition_info,
      };
    }

    throw new Error(response.message || 'Erro ao criar curso');
  }

  /**
   * Atualiza um curso existente
   */
  async updateCourse(id: string, data: Partial<CreateCourseData>): Promise<Course> {
    const response = await schoolApiClient.put<Course>(
      API_ENDPOINTS.COURSES.SHOW(id),
      data
    );

    if (response.status === 'success' && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Erro ao atualizar curso');
  }

  /**
   * Deleta um curso
   */
  async deleteCourse(id: string): Promise<void> {
    const response = await schoolApiClient.delete(API_ENDPOINTS.COURSES.SHOW(id));

    if (response.status !== 'success') {
      throw new Error(response.message || 'Erro ao deletar curso');
    }
  }
}

export const courseService = new CourseService();

