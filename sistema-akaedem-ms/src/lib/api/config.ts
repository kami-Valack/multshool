/**
 * Configuração das APIs
 */

export const API_CONFIG = {
  // URLs das APIs (podem ser configuradas via variáveis de ambiente)
  USERS_API_URL: process.env.NEXT_PUBLIC_USERS_API_URL || 'http://localhost:8001/api',
  SCHOOL_API_URL: process.env.NEXT_PUBLIC_SCHOOL_API_URL || 'http://localhost:8002/api',
  STUDENT_API_URL: process.env.NEXT_PUBLIC_STUDENT_API_URL || 'http://localhost:8003/api',
  ADMIN_API_URL: process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:8004/api',
  
  // API Secret para comunicação entre serviços
  API_SECRET: process.env.NEXT_PUBLIC_API_SECRET || '',
  
  // Timeout padrão para requisições (em ms)
  TIMEOUT: 30000,
};

export const API_ENDPOINTS = {
  // Autenticação
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    ME: '/auth/me',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/password-reset/request',
    RESET_PASSWORD: '/auth/password-reset/reset',
  },
  
  // Escolas/Instituições
  SCHOOLS: {
    LIST: '/admin/schools',
    SHOW: (id: string) => `/admin/schools/${id}`,
    COURSES: (id: string) => `/admin/schools/${id}/courses`,
    APPROVE: (id: string) => `/admin/schools/${id}/approve`,
    REJECT: (id: string) => `/admin/schools/${id}/reject`,
  },
  
  // Cursos
  COURSES: {
    LIST: '/courses',
    SHOW: (id: string) => `/courses/${id}`,
    SUBJECTS: (id: string) => `/courses/${id}/subjects`,
    ADMISSION_EXAMS: (id: string) => `/courses/${id}/admission-exams`,
    EXAM_REGISTRATIONS: (courseId: string, examId: string) => 
      `/courses/${courseId}/admission-exams/${examId}/registrations`,
  },
  
  // Matrículas
  ENROLLMENTS: {
    LIST: (courseId: string) => `/courses/${courseId}/enrollments`,
    UPDATE: (id: string) => `/enrollments/${id}`,
    APPROVE: (id: string) => `/enrollments/${id}/approve`,
    REJECT: (id: string) => `/enrollments/${id}/reject`,
  },
  
  // Inscrições em Exames
  EXAM_REGISTRATIONS: {
    APPROVE: (id: string) => `/exam-registrations/${id}/approve`,
    REJECT: (id: string) => `/exam-registrations/${id}/reject`,
  },
  
  // Docentes
  TEACHERS: {
    LIST: '/teachers',
    LINK_STUDENT: (teacherId: string, studentId: string) => 
      `/teachers/${teacherId}/students/${studentId}`,
    STUDENTS: (teacherId: string) => `/teachers/${teacherId}/students`,
    UNLINK_STUDENT: (teacherId: string, studentId: string) => 
      `/teachers/${teacherId}/students/${studentId}`,
  },
  
  // Atribuições de Professores a Turmas
  TEACHER_ASSIGNMENTS: {
    LIST: '/teacher-assignments',
    SHOW: (id: string) => `/teacher-assignments/${id}`,
    CREATE: '/teacher-assignments',
    BULK_CREATE: '/teacher-assignments/bulk',
    UPDATE: (id: string) => `/teacher-assignments/${id}`,
    DELETE: (id: string) => `/teacher-assignments/${id}`,
  },
  
  // Turmas (Classes)
  CLASSES: {
    LIST: '/classes',
    SHOW: (id: string) => `/classes/${id}`,
    CREATE: '/classes',
    UPDATE: (id: string) => `/classes/${id}`,
    DELETE: (id: string) => `/classes/${id}`,
  },
  
  // Estudantes
  STUDENTS: {
    TEACHERS: (studentId: string) => `/students/${studentId}/teachers`,
  },
  
  // Perfil
  PROFILE: {
    ME: '/me',
    UPDATE: '/profile',
    CHECK_COMPLETION: '/profile/check-completion',
    UPLOAD_LOGO: '/profile/upload-logo',
    UPLOAD_PHOTOS: '/profile/upload-photos',
    UPLOAD_VIDEO: '/profile/upload-video',
  },
};

