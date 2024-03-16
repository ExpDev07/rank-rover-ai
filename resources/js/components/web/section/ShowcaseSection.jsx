import { cn } from "@/lib/utils"

export default function ShowcaseSection({
  className,
  reverse,
  title,
  description,
  features,
  image,
  ctas,
}) {
  return (
    <section className={cn("py-12 text-black bg-white lg:py-24", className)}>
      <div className="container mx-auto">
        <div className="grid items-center grid-cols-12 gap-24">
          <div className="col-span-7">
            <header>
              <h2 className="mb-4 text-3xl font-bold">
                {title}
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                {description}
              </p>
            </header>
            <ul className="flex flex-col gap-3">
              {features.map((feature, i) => (
                <li className="flex items-center gap-x-2" key={i}>
                  <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
            {ctas && (
              <div className="flex items-center gap-2 mt-12">
                {ctas}
              </div>
            )}
          </div>
          <div className={cn("col-span-5", reverse && 'order-first')}>
            {image}
          </div>
        </div>
      </div>
    </section>
  )
}
