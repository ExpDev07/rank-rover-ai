import PricingCard from "@/components/common/pricing/PricingCard"

export default function PricingGrid({
  prices,
  checkout = false,
}) {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-3 place-items-center">
      {prices.map((price) => (
        <PricingCard
          className="w-full h-full"
          key={price.id}
          price={price}
          checkout={checkout}
        />
      ))}
    </div>
  )
}
