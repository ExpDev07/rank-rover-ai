import * as React from "react"
import { router, usePage } from "@inertiajs/react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RecommendedContentCard({
  recommendedContent,
}) {
  const page = usePage()
  const { app } = page.props

  const [loading, setLoading] = React.useState(false)

  const handleWrite = () => {
    router.post(`/app/${app.slug}/content`, {
      cluster_id: recommendedContent.cluster_id,
      recommendation_id: recommendedContent.id,
      title: recommendedContent.title,
      keywords: recommendedContent.keywords,
      language: recommendedContent.language,
    })
  }

  return (
    <Card className="relative w-full px-4 py-2">
      <CardHeader className="flex flex-row items-center gap-x-8">
        <Badge className="absolute -top-2 -left-4" variant="">
          Recommended!
        </Badge>
        <img
          className="w-16 h-16"
          src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${recommendedContent.title}`}
          alt={recommendedContent.title}
        />
        <div className="flex-1">
          <CardTitle className="mb-2 text-lg">
            {recommendedContent.title}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {recommendedContent.keywords.map((keyword) => (
              <Badge variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleWrite()}
        >
          Start writing ✏️
        </Button>
      </CardHeader>
    </Card>
  )
}
