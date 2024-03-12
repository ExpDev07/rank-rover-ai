import { usePage, Link } from "@inertiajs/react"

import { Button } from "@/components/ui/button"

export default function Navbar() {
  const page = usePage()
  const { current_user } = page.props

  return (
    <nav className="py-2 text-black bg-white border-b">
      <div className="container flex items-center justify-between mx-auto gap-x-6">
        <Link className="flex items-center gap-x-0" href="/">
          <img
            className="block w-10 lg:w-20"
            src="http://localhost:8000/images/logo.png"
            alt="logo"
          />
          <span className="font-mono font-bold text-md lg:text-lg">
            RankRover.ai
          </span>
        </Link>
        <div className="flex items-center gap-x-2">
          {current_user ? (
          <Button asChild>
            <Link href="/apps">
              Go to dashboard
            </Link>
          </Button>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">
                  Log in
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register">
                  Get started 🌟
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
