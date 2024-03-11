import PricingCard from "@/components/common/pricing/PricingCard"

export default function PricingGrid({
  prices,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 place-items-center">
      {prices.map((price, i) => (
        <PricingCard
          key={i}
          price={price}
        />
      ))}
    </div>
  )
}
