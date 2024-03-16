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
            className="block w-5 lg:w-20"
            src="https://rankrover.ai/images/logo.png"
            alt="logo"
          />
          <span className="font-mono font-bold text-md lg:text-lg">
            RankRover.ai
          </span>
        </Link>
        <div className="flex items-center gap-x-2">
          <div className="items-center hidden mr-6 lg:flex gap-x-4">
            <Link className="text-sm hover:underline hover:text-primary" href="/">
              Home
            </Link>
            <Link className="text-sm hover:underline hover:text-primary" href="/pricing">
              Pricing
            </Link>
          </div>
          {current_user ? (
          <Button asChild>
            <Link href="/apps">
              Go to app 🌟
            </Link>
          </Button>
          ) : (
            <>
              <Button className="hidden lg:flex" variant="outline" asChild>
                <Link href="/login">
                  Log in 😎
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
