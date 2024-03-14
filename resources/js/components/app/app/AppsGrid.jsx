import AppCard from "@/components/app/app/AppCard"
import CreateAppCard from "@/components/app/app/CreateAppCard"
import { cn } from "@/lib/utils"

export default function AppsGrid({
  apps,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {apps.map((app, i) => (
        <AppCard
          className="h-full"
          key={i}
          app={app}
        />
      ))}
      <CreateAppCard
        className={cn(apps.length === 0 ? 'col-span-4 h-52' : 'col-span-1 h-full')}
      />
    </div>
  )
}
