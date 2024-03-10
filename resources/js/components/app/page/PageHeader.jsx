export default function PageHeader({
  icon,
  title,
  description,
  actions,
}) {
  return (
    <header className="flex items-start justify-between">
      <div className="flex items-center gap-x-6">
        {icon}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-x-2">
          {actions}
        </div>
      )}
    </header>
  )
}
