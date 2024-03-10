import ContentCard from "@/components/app/content/ContentCard"

export default function ContentGrid() {
  const content = [
    {
      title: 'How SEO can drive organic traffic to your app',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aspernatur aliquam sequi',
      status: 'generating',
    },
    {
      title: 'Other content',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aspernatur aliquam sequi'
    },
    {
      title: 'Cool content',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aspernatur aliquam sequi'
    },
    {
      title: 'Sweet content',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aspernatur aliquam sequi'
    },
    {
      title: 'New content',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aspernatur aliquam sequi'
    },
  ]

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
