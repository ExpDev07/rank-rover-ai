import AppCard from "@/components/app/app/AppCard"
import CreateAppCard from "@/components/app/app/CreateAppCard"

export default function AppsGrid({
  apps,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {apps.map((app, i) => (
        <AppCard
          key={i}
          app={app}
        />
      ))}
      <CreateAppCard />
    </div>
  )
}
