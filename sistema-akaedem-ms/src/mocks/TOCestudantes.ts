// src/lib/mock-data.ts
import { z } from "zod"

// Estudante
export const studentSchema = z.object({
  id: z.number(),
  photo: z.string().optional(),
  name: z.string(),
  studentNumber: z.string(),
  course: z.string(),
  class: z.string(),
  year: z.string(),
  enrollmentDate: z.string(),
  status: z.enum(["ativo", "suspenso", "transferido", "desistente", "formado"]),
  phone: z.string(),
  email: z.string(),
  entryType: z.enum(["novo", "transferido", "recorrente"]).optional(),
})
export type Student = z.infer<typeof studentSchema>

export const mockStudents: Student[] = [
  {
    id: 1,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    name: "Maria Silva Santos",
    studentNumber: "EST2024001",
    course: "Engenharia Informática",
    class: "EI-3A",
    year: "2024/2025",
    enrollmentDate: "2024-09-01",
    status: "ativo",
    phone: "+244 923 456 789",
    email: "maria.santos@estudante.edu.ao",
    entryType: "novo",
  },
  // ... +4 outros (abreviado)
]

// Documentos
export type Document = {
  id: string
  name: string
  type: "BI" | "Certificado" | "Declaração" | "Foto"
  uploadedAt: string
  size: string
}
export const mockDocuments: Document[] = [
  { id: "1", name: "BI_Maria.pdf", type: "BI", uploadedAt: "2024-09-01", size: "1.2 MB" },
  { id: "2", name: "Certificado_Ensino.pdf", type: "Certificado", uploadedAt: "2024-09-02", size: "800 KB" },
]

// Financeiro
export type Payment = {
  id: string
  description: string
  amount: number
  dueDate: string
  paidDate?: string
  status: "pago" | "pendente" | "atrasado"
}
export const mockPayments: Payment[] = [
  { id: "1", description: "Propina - Setembro", amount: 25000, dueDate: "2024-09-30", paidDate: "2024-09-15", status: "pago" },
  { id: "2", description: "Propina - Outubro", amount: 25000, dueDate: "2024-10-30", status: "pendente" },
]

// Histórico Académico
export type Grade = {
  subject: string
  grade: number
  date: string
}
export type HistoryEvent = {
  id: string
  type: "nota" | "transferência" | "reincidência" | "observação"
  description: string
  date: string
}
export const mockGrades: Grade[] = [
  { subject: "Programação I", grade: 16, date: "2024-06-15" },
  { subject: "Matemática II", grade: 14, date: "2024-06-16" },
]
export const mockHistory: HistoryEvent[] = [
  { id: "1", type: "transferência", description: "Transferido de EI-2B para EI-3A", date: "2024-03-10" },
  { id: "2", type: "observação", description: "Falta justificada", date: "2024-10-05" },
]