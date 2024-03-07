import { cn } from "@/lib/utils"

import Navbar from "@/components/app/navbar"
import Footer from "@/components/app/footer"

export default function Layout({
  className,
  children,
  ...props
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={cn('flex-1', className)} {...props}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
