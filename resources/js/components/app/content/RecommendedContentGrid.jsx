import RecommendedContentCard from "@/components/app/content/RecommendedContentCard"

export default function RecommendedContentGrid({
  recommendedContent,
}) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {recommendedContent.map((c, i) => (
        <RecommendedContentCard
          key={i}
          recommendedContent={c}
        />
      ))}
    </div>
  )
}
