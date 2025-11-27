export type StudyLevel = 
  | "Ensino Médio" 
  | "Ensino Superior" 
  | "ensino médio " 
  | "Ensino médio ";

export type Period = "Manhã" | "Tarde" | "Noite";

export interface Enrollment {
  id: string;
  studentId: string;       // ligação ao Student
  institution: string;
  faculdade?: string;      // opcional
  course: string;          // pode ser o id do curso
  period: Period;
  studyLevel: StudyLevel;
  enrolledAt: string;      // data da matrícula
}
