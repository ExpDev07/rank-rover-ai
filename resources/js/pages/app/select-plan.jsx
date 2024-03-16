import { Head, Link } from "@inertiajs/react"

import { Button } from "@/components/ui/button"

import PricingGrid from "@/components/common/pricing/PricingGrid"

export default function SelectPlanPage({
  current_user,
  subscription_plans,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <Head>
        <title>Select plan</title>
      </Head>
      <Button className="absolute top-5 left-5" variant="outline" asChild>
        <Link href="/">
          Back to home 🛑
        </Link>
      </Button>
      <header className="text-center">
        <h1 className="mb-2 text-4xl font-bold">
          Select your plan 🚀
        </h1>
        <p className="mb-20 text-lg text-muted-foreground">
          Hi, {current_user.name}! Choose from one of our available plans below.
        </p>
      </header>
      <main>
        <PricingGrid
          prices={subscription_plans}
          checkout={true}
        />
      </main>
    </div>
  )
}
