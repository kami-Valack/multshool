"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple bar chart with approved and failed students"

const chartData = [
  { course: "Engenharia", approved: 120, failed: 30 },
  { course: "Direito", approved: 95, failed: 50 },
  { course: "Medicina", approved: 80, failed: 20 },
  { course: "Gestão", approved: 70, failed: 40 },
  { course: "Informática", approved: 60, failed: 25 },
]

const chartConfig = {
  approved: { label: "Aprovados", color: "var(--chart-1)" },
  failed: { label: "Reprovados", color: "var(--chart-2)" },
} satisfies ChartConfig

export function ChartBarMultiple() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alunos por Curso</CardTitle>
        <CardDescription>Quantidade de aprovados e reprovados</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="course"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="approved" fill="var(--color-approved)" radius={4} />
            <Bar dataKey="failed" fill="var(--color-failed)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Desempenho por curso <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Mostrando alunos aprovados e reprovados
        </div>
      </CardFooter>
    </Card>
  )
}
