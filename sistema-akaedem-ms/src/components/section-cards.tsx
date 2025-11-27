"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cardsData } from "@/mocks/kpis"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {cardsData.map((card) => {
        const TrendIcon = card.trendIcon
        return (
          <Card key={card.id} className="@container/card">
            <CardHeader className="relative">
              <CardDescription>{card.description}</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                {card.value}
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  <TrendIcon className="size-3" />
                  {card.trend}
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {card.footerTitle} <TrendIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">{card.footerSubtitle}</div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
