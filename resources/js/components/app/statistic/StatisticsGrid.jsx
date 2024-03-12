import * as React from "react"
import { usePage } from "@inertiajs/react"
import { PaperPlaneIcon, HeartIcon, SketchLogoIcon } from '@radix-ui/react-icons'

import StatisticCard from "@/components/app/statistic/StatisticCard"

export default function StatisticsGrid() {
  const page = usePage()
  const { statistics: stats } = page.props

  const statistics = [
    {
      title: "Content generated",
      icon: <PaperPlaneIcon width={24} height={24} />,
      amount: stats.content_generated.amount,
      amountDescription: "+32% increase from last month",
    },
    {
      title: "Dollars saved",
      icon: <SketchLogoIcon width={24} height={24} />,
      amount: `$ ${stats.dollars_saved.amount}`,
      amountDescription: "+15% increase from last month",
    },
    {
      title: "Hours saved",
      icon: <HeartIcon width={24} height={24} />,
      amount: stats.hours_saved.amount,
      amountDescription: "+62% increase from last month",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
      {statistics.map((statistic) => (
        <StatisticCard
          key={statistic.title}
          title={statistic.title}
          icon={statistic.icon}
          amount={statistic.amount}
          amountDescription={statistic.amountDescription}
        />
      ))}
    </div>
  )
}
