import ContentCard from "@/components/app/content/ContentCard"

export default function ContentGrid({
  content,
}) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {content.map((c, i) => (
        <ContentCard
          key={i}
          content={c}
        />
      ))}
    </div>
  )
}
