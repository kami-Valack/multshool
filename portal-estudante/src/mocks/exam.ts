import { ExamResult } from "@/types/exame-acesso";

export const mockExamResults: ExamResult[] = [
  {
    id: "exam-1",
    studentId: "stu-1",
    inscricaoId: "enr-1",
    date: "2025-08-15",
    notaexame: 14,
    approved: true,
  },
  {
    id: "exam-2",
    studentId: "stu-2",
    inscricaoId: "enr-2",
    date: "2025-08-15",
    notaexame: 8,
    approved: false,
  },
];
