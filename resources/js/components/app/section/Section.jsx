import * as React from "react"
import { cn } from "@/lib/utils"

export default function Section({
  className,
  children,
}) {
  return (
    <section className={cn('relative mb-10', className)}>
      {children}
    </section>
  )
}
