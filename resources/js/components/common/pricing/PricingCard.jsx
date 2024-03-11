import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export default function PricingCard({
  price,
}) {
  return (
    <Card className={cn('relative w-full h-full flex flex-col justify-between', price.popular ? 'border-rose-400 py-4 border-4' : 'border-zinc-700 py-4 border-2')}>
      <CardHeader>
        {price.popular && (
          <span className="absolute text-4xl top-5 right-5">
            🔥
          </span>
        )}
        {price.isYearly && price.yearlyPrice && price.monthlyPrice ? (
          <div className="flex justify-between">
            <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
              {price.title}
            </CardTitle>
            <div className={cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white", price.popular && 'bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black')}>
              Save ${price.monthlyPrice * 12 - price.yearlyPrice}
            </div>
          </div>
        ) : (
          <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
            {price.title}
          </CardTitle>
        )}
        <div className="flex gap-1">
          <h3 className="text-3xl font-bold">
            {price.yearlyPrice && price.isYearly ? "$" + price.yearlyPrice : price.monthlyPrice ? "$" + price.monthlyPrice : "Custom"}
          </h3>
          <span className="flex flex-col justify-end mb-1 text-sm">
            {price.yearlyPrice && price.isYearly ? "/year" : price.monthlyPrice ? "/month" : ''}
          </span>
        </div>
        <CardDescription className="pt-2">
          {price.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {price.features.map((feature) => (
          <CheckItem
            key={feature}
            text={feature}
          />
        ))}
      </CardContent>
      <CardFooter className="pt-6 mt-auto">
        <Button className="w-full" size="lg">
          Get started <span className="ml-2 text-lg -translate-y-1">👉</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

function CheckItem({
  text
}) {
  return (
    <div className="flex gap-2">
      <CheckCircle2
        className="my-auto text-green-400"
        size={18}
      />
      <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">
        {text}
      </p>
    </div>
  )
}
