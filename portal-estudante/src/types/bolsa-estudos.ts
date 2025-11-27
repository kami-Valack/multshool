export interface ScholarshipApplication {
  id: string;
  studentId: string;
  enrollmentId: string;
  examResultId: string; 
  appliedAt: string;
  status: "Pendente" | "Aprovado" | "Reprovado";
}
