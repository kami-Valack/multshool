"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTeachers } from "@/hooks/useTeachers"
import { useCourses } from "@/hooks/useCourses"
import { TrendingUpIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function SectionCards() {
  const { teachers, loading: teachersLoading } = useTeachers()
  const { courses, loading: coursesLoading } = useCourses()

  const loading = teachersLoading || coursesLoading

  const cards = [
    {
      id: 1,
      description: "Cursos activos",
      value: String(courses.length),
      trend: "API",
      footerTitle: "Cursos da instituição",
      footerSubtitle: "Dados em tempo real",
    },
    {
      id: 2,
      description: "Docentes activos",
      value: String(teachers.filter((t) => t.status === "active" || !t.status).length),
      trend: "API",
      footerTitle: "Quadro docente",
      footerSubtitle: "Dados em tempo real",
    },
    {
      id: 3,
      description: "Propinas recebidas",
      value: "—",
      trend: "—",
      footerTitle: "Sem dados financeiros",
      footerSubtitle: "Aguarda integração da API",
    },
    {
      id: 4,
      description: "Taxa de aprovação geral",
      value: "—",
      trend: "—",
      footerTitle: "Sem dados académicos",
      footerSubtitle: "Aguarda integração da API",
    },
  ]

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {cards.map((card) => (
        <Card key={card.id} className="@container/card">
          <CardHeader className="relative">
            <CardDescription>{card.description}</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {loading ? <Skeleton className="h-8 w-20" /> : card.value}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" />
                {card.trend}
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.footerTitle} <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">{card.footerSubtitle}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
