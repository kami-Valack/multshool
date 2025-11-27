import { Enrollment } from "@/types/inscricao";

export const mockEnrollments: Enrollment[] = [
  {
    id: "enr-1",
    studentId: "stu-1",
    institution: "Universidade Agostinho Neto",
    faculdade: "Ciências Exactas",
    course: "c-1", // Engenharia Informática
    period: "Manhã",
    studyLevel: "Ensino Superior",
    enrolledAt: "2025-09-15T08:30:00Z",
  },
  {
    id: "enr-2",
    studentId: "stu-2",
    institution: "Universidade Católica",
    faculdade: "Ciências Sociais",
    course: "c-2", // Gestão de Empresas
    period: "Noite",
    studyLevel: "Ensino Superior",
    enrolledAt: "2025-09-16T10:00:00Z",
  },
];
