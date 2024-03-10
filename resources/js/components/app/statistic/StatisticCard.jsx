import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function StatisticCard({
  title,
  icon,
  amount,
  amountDescription,
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {amount}
        </div>
        <p className="text-xs text-muted-foreground">
          {amountDescription}
        </p>
      </CardContent>
    </Card>
  )
}
