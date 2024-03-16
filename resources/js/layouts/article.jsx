import { usePage, Link } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/web/navbar"
import Footer from "@/components/web/footer"

export default function ArticleLayout({
  current_user,
  children,
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container flex-1 mx-auto">
        <article className="py-12 mx-auto prose lg:py-24 prose-md lg:prose-lg">
          <div className="mb-12 lg:mb-20">
            {children}
          </div>
          <div className="flex flex-col items-center gap-3 lg:flex-row">
            <Button size="lg" asChild>
              {current_user ? (
                <Link href="/apps">
                  Go to app
                </Link>
              ) : (
                <Link href="/pricing">
                  Get started
                </Link>
              )}
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">
                Back to RankRover.ai
              </Link>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
