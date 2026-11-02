// Tipos partilhados para a gestão de estudantes (sem dados fictícios)
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

export type Payment = {
  id: string
  description: string
  amount: number
  dueDate: string
  paidDate?: string
  status: "pago" | "pendente" | "atrasado"
}

export type Document = { id: string; name: string; type: string; uploadedAt: string }

export type Grade = { subject: string; grade: number; date: string }

export type HistoryEvent = { id: string; description: string; date: string }
