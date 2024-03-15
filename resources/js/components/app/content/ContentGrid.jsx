import { cn } from "@/lib/utils"

import ContentCard from "@/components/app/content/ContentCard"
import CreateContentCard from "@/components/app/content/CreateContentCard"

export default function ContentGrid({
  content,
}) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {content.map((c, i) => (
        <ContentCard
          key={c.id}
          content={c}
        />
      ))}
      {content.length === 0 && (
        <CreateContentCard
          className={cn(content.length === 0 ? 'col-span-1 h-52' : 'col-span-1 h-full')}
        />
      )}
    </div>
  )
}
