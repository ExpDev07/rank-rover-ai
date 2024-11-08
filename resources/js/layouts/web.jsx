import { cn } from "@/lib/utils"

import Navbar from "@/components/web/navbar"
import Footer from "@/components/web/footer"

export default function Layout({
  className,
  children,
  ...props
}) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <main className={cn('flex-1', className)} {...props}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
