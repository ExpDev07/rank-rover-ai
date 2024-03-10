import { Link } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
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
  return (
    <Link href="/content">
      <Card className="relative w-full px-4 py-2 hover:ring-primary hover:ring-2">
        <CardHeader className="flex flex-row items-center gap-x-6">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${content.title}`}
              alt={content.title}
            />
            <AvatarFallback>
              {content.title}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">
              {content.title}
            </CardTitle>
            <CardDescription className="text-md">
              {content.description}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
