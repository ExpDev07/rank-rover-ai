import { usePage, Link }from "@inertiajs/react"
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
  className,
  price,
  checkout,
}) {
  const page = usePage();
  const { current_user } = page.props;

  return (
    <Card className={
      cn('relative flex flex-col justify-between',
      price.popular ? 'border-rose-400 py-4 border-4 scale-110' : 'py-4 border-2',
      className
    )}>
      <CardHeader>
        {price.popular && (
          <span className="absolute text-4xl top-5 right-5">
            🔥
          </span>
        )}
        {price.isYearly && price.yearlyPrice && price.price ? (
          <div className="flex justify-between">
            <CardTitle className="text-lg text-zinc-700">
              {price.name}
            </CardTitle>
            <div className={cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black", price.popular && 'bg-gradient-to-r from-orange-400 to-rose-400')}>
              Save ${(price.price / 100) * 12 - price.yearlyPrice}
            </div>
          </div>
        ) : (
          <CardTitle className="text-lg text-zinc-700">
            {price.name}
          </CardTitle>
        )}
        <div className="flex gap-1">
          <h3 className="text-3xl font-bold">
            {price.yearlyPrice && price.isYearly ? "$" + price.yearlyPrice : (price.price / 100) ? "$" + (price.price / 100) : "Custom"}
          </h3>
          <span className="flex flex-col justify-end mb-1 text-sm">
            {price.yearlyPrice && price.isYearly ? "/year" : (price.price / 100) ? "/month" : ''}
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
        <Button
          className="w-full"
          size="lg"
          variant={price.popular ? 'default' : 'outline'}
          asChild
        >
          {current_user ? (
            <Link href="/apps" method="get">
              Go to app <span className="ml-2 text-lg -translate-y-1">👉</span>
            </Link>
          ) : (
            checkout ? (
              <Link href={`/select-plan/${price.key}/checkout`} method="post">
                Select plan <span className="ml-2 text-lg -translate-y-1">👉</span>
              </Link>
            ) : (
              <Link href={`/register?plan=${price.key}`} method="get">
                Get started <span className="ml-2 text-lg -translate-y-1">👉</span>
              </Link>
            )
          )}
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
      <p className="pt-0.5 text-zinc-700 text-sm">
        {text}
      </p>
    </div>
  )
}
