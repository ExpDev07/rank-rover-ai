import { Link } from "@inertiajs/react"
import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AppCard({
  app,
  className,
  ...props
}) {
  return (
    <Link href={`/app/${app.slug}`}>
      <Card className={cn("p-4 relative hover:ring hover:ring-primary hover:cursor-pointer", className)} {...props}>
        <CardHeader>
          <img
            className="w-16 h-16 mb-6"
            src={`https://api.dicebear.com/7.x/shapes/svg?seed=${app.name}`}
            alt={app.name}
          />
          <CardTitle>
            {app.name}
          </CardTitle>
          <CardDescription>
            {app.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
