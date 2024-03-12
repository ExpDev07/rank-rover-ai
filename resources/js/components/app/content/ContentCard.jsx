import { usePage, Link } from "@inertiajs/react"
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
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
        content.status === 'idle' && 'opacity-50 pointer-events-none',
        content.status === 'generating' && 'opacity-50 pointer-events-none',
        content.status === 'errored' && 'opacity-50 pointer-events-none',
      )}>
        <CardHeader className="flex flex-row items-center gap-x-6">
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${content.title}`}
              alt={content.title}
            />
            <AvatarFallback>
              {content.title}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="mb-2 text-lg">
              {content.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              {content.keywords.map((keyword) => (
                <Badge variant="outline">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
          {content.status === 'generating' && (
            <ArrowPathIcon className="w-7 h-7 animate-spin text-muted-foreground" />
          )}
        </CardHeader>
      </Card>
    </Link>
  )
}
