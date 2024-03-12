import { cn } from "@/lib/utils"

import { Link } from "@inertiajs/react"

export default function HeaderNav({
  className,
  ...props
}) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/apps"
        className="text-sm font-medium transition-colors hover:text-primary"
        inactiveProps={{ className: 'text-muted-foreground' }}
        activeOptions={{ exact: true }}
      >
        Apps
      </Link>
    </nav>
  )
}
