export default function SectionHeader({
  title,
  description,
}) {
  return (
    <header className="relative mb-4">
      <h2 className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </header>
  )
}
