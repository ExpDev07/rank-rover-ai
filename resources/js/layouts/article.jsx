import { Link } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/app/navbar"
import Footer from "@/components/app/footer"

export default function ArticleLayout({
  children,
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto">
        <article className="py-12 lg:py-24 prose prose-md lg:prose-lg mx-auto">
          <div className="mb-12 lg:mb-20">
            {children}
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-3">
            <Button size="lg" asChild>
              <Link href="/varsel">
                Varsle nå
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">
                Tilbake til MeldSmitte.no
              </Link>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}