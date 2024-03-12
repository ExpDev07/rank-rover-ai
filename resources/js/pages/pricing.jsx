import Layout from "@/layouts/web"

import PricingGrid from "@/components/common/pricing/PricingGrid"

export default function PricingPage({
  subscription_plans,
}) {
  return (
    <Layout>
      <header className="pt-20 pb-0 text-center">
        <div className="container mx-auto">
          <h1 className="mb-2 text-4xl font-bold">
            Our plans 🚀
          </h1>
          <p className="mb-20 text-lg text-muted-foreground">
            Choose from one of our available plans below to get started.
          </p>
        </div>
      </header>
      <main className="pt-0 pb-48">
        <div className="container mx-auto">
          <PricingGrid
            prices={subscription_plans}
            checkout={false}
          />
        </div>
      </main>
    </Layout>
  )
}
