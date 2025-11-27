// mocks/cardsMock.ts

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

export const cardsData = [
  {
    id: 1,
    description: "Estudantes Matriculados",
    value: "3,452",
    trend: "+5.2%",
    trendIcon: TrendingUpIcon,
    footerTitle: "Crescimento mensal",
    footerSubtitle: "Comparado ao mês anterior",
  },
  {
    id: 2,
    description: "Docentes Activos",
    value: "234",
    trend: "-2.1%",
    trendIcon: TrendingDownIcon,
    footerTitle: "Redução de docentes",
    footerSubtitle: "Comparado ao mês anterior",
  },
  {
    id: 3,
    description: "Propinas Recebidas",
    value: "Akz 12,450,000",
    trend: "+8.7%",
    trendIcon: TrendingUpIcon,
    footerTitle: "Receita em crescimento",
    footerSubtitle: "Em relação ao mês anterior",
  },
  {
    id: 4,
    description: "Taxa de Aprovação Geral",
    value: "87.5%",
    trend: "+1.3%",
    trendIcon: TrendingUpIcon,
    footerTitle: "Performance geral",
    footerSubtitle: "Comparado ao semestre passado",
  },
]
