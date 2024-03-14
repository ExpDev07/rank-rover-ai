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

  const handleCreateContent = (recommendedContent) => {
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
            Create from recommendations 🚀
          </DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>
        <div className="py-6">

        </div>
      </DialogContent>
    </Dialog>
  )
}
