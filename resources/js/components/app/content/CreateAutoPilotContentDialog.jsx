import * as React from "react"
import { router, usePage } from "@inertiajs/react"
import { cn } from "@/lib/utils"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CreateAutoPilotContentDialog({
  language,
  children,
}) {
  const page = usePage()
  const { app } = page.props

  const [loadingRecommendations, setLoadingRecommendations] = React.useState(false)
  const [recommendationsError, setRecommendationsError] = React.useState('')

  const handleCreateCluster = () => {
    router.post(`/app/${app.slug}/content-cluster`, { language }, {
      preserveState: false,
      onStart: () => setLoadingRecommendations(true),
      onFinish: () => setLoadingRecommendations(false),
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Create with AutoPilot 🚀
          </DialogTitle>
          <DialogDescription>
            We'll recommend content for you, then you just hit write on the ones you'd like.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <button
            className={cn('flex flex-col items-center justify-center w-full h-48 gap-3 border-2 rounded-md hover:border-primary', loadingRecommendations && 'pointer-events-none')}
            type="button"
            onClick={() => handleCreateCluster()}
          >
            {!loadingRecommendations ? (
              <>
                <span className="text-2xl">🤖</span>
                <span className="">Create recommendations</span>
              </>
            ) : (
              <ul className="flex flex-col gap-y-4">
                <li className="flex items-center gap-x-2">
                  <span className="block w-4 h-4 rounded-full animate-pulse bg-emerald-400"></span>
                  <span className="text-sm">Creating titles</span>
                </li>
                <li className="flex items-center gap-x-2">
                  <span className="block w-4 h-4 rounded-full animate-pulse bg-emerald-400"></span>
                  <span className="text-sm">Finding the right keywords</span>
                </li>
                <li className="flex items-center gap-x-2">
                  <span className="block w-4 h-4 rounded-full animate-pulse bg-emerald-400"></span>
                  <span className="text-sm">Crunching SEO</span>
                </li>
              </ul>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
