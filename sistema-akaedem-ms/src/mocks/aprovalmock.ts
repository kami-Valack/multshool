import type { ChartConfig } from "@/components/ui/chart"

export interface ApprovalData {
  date: string
  [course: string]: number | string
}

export const approvalChartData: ApprovalData[] = [
  { date: "2024-06-01", Engenharia: 45, Direito: 70, Medicina: 52, Gestão: 67, Informática: 30 },
  { date: "2024-06-02", Engenharia: 55, Direito: 65, Medicina: 60, Gestão: 72, Informática: 40 },
  { date: "2024-06-03", Engenharia: 50, Direito: 75, Medicina: 65, Gestão: 68, Informática: 35 },
  { date: "2024-06-04", Engenharia: 60, Direito: 80, Medicina: 70, Gestão: 73, Informática: 45 },
  { date: "2024-06-05", Engenharia: 58, Direito: 78, Medicina: 68, Gestão: 71, Informática: 42 },
  { date: "2024-06-06", Engenharia: 62, Direito: 82, Medicina: 72, Gestão: 76, Informática: 50 },
  { date: "2024-06-07", Engenharia: 55, Direito: 79, Medicina: 66, Gestão: 70, Informática: 47 },
  { date: "2024-06-08", Engenharia: 65, Direito: 85, Medicina: 75, Gestão: 77, Informática: 55 },
  { date: "2024-06-09", Engenharia: 60, Direito: 80, Medicina: 70, Gestão: 73, Informática: 50 },
  { date: "2024-06-10", Engenharia: 68, Direito: 88, Medicina: 78, Gestão: 79, Informática: 58 },
]

export const chartConfig: ChartConfig = {
  Engenharia: { label: "Engenharia", color: "var(--chart-1)" },
  Direito: { label: "Direito", color: "var(--chart-2)" },
  Medicina: { label: "Medicina", color: "var(--chart-3)" },
  Gestão: { label: "Gestão", color: "var(--chart-4)" },
  Informática: { label: "Informática", color: "var(--chart-5)" },
}
