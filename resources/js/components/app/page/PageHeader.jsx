export default function PageHeader({
  icon,
  title,
  description,
  actions,
}) {
  return (
    <header className="flex items-start justify-between">
      <div className="flex items-center gap-x-4">
        {icon && (
          <img
            className="w-16 h-16"
            src={icon}
            alt={title}
          />
        )}
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
      {actions}
    </header>
  )
}
