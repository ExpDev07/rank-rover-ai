import { router, Link } from "@inertiajs/react"

import { Button } from "@/components/ui/button"

export default function ThankYouPage({
  current_user,
  current_user_subscribed,
}) {
  if (current_user_subscribed) {
    router.get('/app')
  } else {
    setTimeout(() => {
      router.get('/thank-you', {}, { preserveState: false, preserveScroll: true, replace: true })
    }, 5000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <Button className="absolute top-5 left-5" variant="outline" asChild>
        <Link href="/">
          Back to home 🛑
        </Link>
      </Button>
      <header className="flex flex-col items-center justify-center text-center">
        <img
          className="mb-0 w-44 animate-bounce"
          src="http://localhost:8000/images/logo.png"
          alt="Logo"
        />
        <h1 className="mb-6 text-6xl font-bold">
          Thank you! <br /> We're checking your payment 🥳
        </h1>
        <p className="mb-20 text-xl text-muted-foreground">
          We appreciate your trust, {current_user.name}! Please hold while we're confirming your payment.
        </p>
      </header>
    </div>
  )
}
