import * as React from "react"

export default function Section({
  children,
}) {
  return (
    <section className="relative mb-10">
      {children}
    </section>
  )
}
