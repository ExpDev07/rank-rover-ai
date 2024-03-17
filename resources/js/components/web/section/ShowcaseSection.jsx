import { cn } from "@/lib/utils"

export default function ShowcaseSection({
  className,
  reverse,
  largeImage,
  title,
  description,
  features,
  image,
  ctas,
}) {
  return (
    <section className={cn("py-12 text-black bg-white lg:py-24", className)}>
      <div className="container mx-auto">
        <div className="grid items-center grid-cols-1 gap-12 lg:gap-24 lg:grid-cols-12">
          <div className={cn("lg:col-span-7", largeImage && 'lg:col-span-5')}>
            <header>
              <h2 className="mb-4 text-3xl font-bold">
                {title}
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                {description}
              </p>
            </header>
            <ul className="flex flex-col gap-4">
              {features.map((feature, i) => (
                <li className="flex items-center gap-x-3" key={i}>
                  <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                  <span className="text-lg leading-tight lg:text-lg">{feature}</span>
                </li>
              ))}
            </ul>
            {ctas && (
              <div className="flex items-center gap-2 mt-12">
                {ctas}
              </div>
            )}
          </div>
          <div className={cn("lg:col-span-5 shadow rounded-md", largeImage && 'lg:col-span-7', reverse && 'lg:order-first')}>
            {image}
          </div>
        </div>
      </div>
    </section>
  )
}
