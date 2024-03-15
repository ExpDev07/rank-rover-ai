import { usePage, Link } from "@inertiajs/react"
import { ArrowPathIcon } from '@heroicons/react/24/solid'
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

export default function ContentCard({
  content,
}) {
  const page = usePage()
  const { app } = page.props

  return (
    <Link href={`/app/${app.slug}/content/${content.slug}`}>
      <Card className={cn(
        'relative w-full px-4 py-2 hover:ring hover:ring-primary',
      )}>
        <CardHeader className="flex flex-row items-center justify-between gap-x-24">
          <div className="flex flex-row items-center gap-x-8">
            <img
              className="w-16 h-16"
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${content.title}`}
              alt={content.title}
            />
            <div className="flex-1">
              <CardTitle className="mb-2 text-lg">
                {content.title}
              </CardTitle>
              {content.current_revision?.content_md && (
                <CardDescription>
                  {content.current_revision?.content_md.slice(0, 250)}...
                </CardDescription>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {content.keywords.map((keyword, i) => (
                  <Badge key={i} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {(!content.content_queued && !content.current_revision) && (
            <Button size="sm" onClick={() => console.log('write now')}>Write now</Button>
          )}
          {(content.content_queued || content.current_revision?.status === 'generating') && (
            <ArrowPathIcon className="w-7 h-7 animate-spin text-muted-foreground" />
          )}
          {(!content.content_queued && content.current_revision && content.current_revision.status === 'generated') && (
            <Badge variant="success">Ready</Badge>
          )}
          {(!content.content_queued && content.current_revision && content.current_revision.status === 'errored') && (
            <Badge variant="destructive">Error</Badge>
          )}
        </CardHeader>
      </Card>
    </Link>
  )
}
