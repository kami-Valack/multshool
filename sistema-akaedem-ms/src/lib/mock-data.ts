// src/lib/mock-data.ts
import { z } from "zod"

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
  {
    id: 2,
    name: "João Pedro Mendes",
    studentNumber: "EST2024002",
    course: "Gestão de Empresas",
    class: "GE-2B",
    year: "2024/2025",
    enrollmentDate: "2024-09-02",
    status: "suspenso",
    phone: "+244 912 345 678",
    email: "joao.mendes@estudante.edu.ao",
  },
  {
    id: 3,
    name: "Ana Luísa Costa",
    studentNumber: "EST2024003",
    course: "Engenharia Informática",
    class: "EI-3A",
    year: "2024/2025",
    enrollmentDate: "2024-09-01",
    status: "ativo",
    phone: "+244 934 567 890",
    email: "ana.costa@estudante.edu.ao",
  },
]

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

export type Document = { id: string; name: string; type: string; uploadedAt: string }
export const mockDocuments: Document[] = [
  { id: "1", name: "BI_Maria.pdf", type: "BI", uploadedAt: "2024-09-01" },
  { id: "2", name: "Certificado_Ensino.pdf", type: "Certificado", uploadedAt: "2024-09-02" },
]

export type Grade = { subject: string; grade: number; date: string }
export const mockGrades: Grade[] = [
  { subject: "Programação I", grade: 16, date: "2024-06-15" },
  { subject: "Matemática II", grade: 14, date: "2024-06-16" },
]

export type HistoryEvent = { id: string; description: string; date: string }
export const mockHistory: HistoryEvent[] = [
  { id: "1", description: "Transferido de EI-2B para EI-3A", date: "2024-03-10" },
  { id: "2", description: "Falta justificada", date: "2024-10-05" },
]