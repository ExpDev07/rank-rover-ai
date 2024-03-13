import * as React from "react"
import { router, usePage } from "@inertiajs/react"
import { cn } from "@/lib/utils"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import CreateManualContentDialog from "@/components/app/content/CreateManualContentDialog"
import CreateAutoPilotContentDialog from "@/components/app/content/CreateAutoPilotContentDialog"

const languages = [
  { label: "English", value: "English" },
  { label: "Norwegian", value: "Norwegian" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
  { label: "Spanish", value: "Spanish" },
  { label: "Portuguese", value: "Portuguese" },
  { label: "Russian", value: "Russian" },
  { label: "Japanese", value: "Japanese" },
  { label: "Korean", value: "Korean" },
  { label: "Chinese", value: "Chinese" },
]

export default function CreateContentDialog({
  children,
}) {
  const page = usePage()
  const { app } = page.props

  const [language, setLanguage] = React.useState('English');
  const [selectedMethod, setSelectedMethod] = React.useState('')

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Let's create some content 🚀
          </DialogTitle>
          <DialogDescription>
            You can create content manually or on AutoPilot. Both leverages AI, but AutoPilot will recommend content for you.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 space-y-8">
          <div className="flex flex-col gap-2">
            <Label>
              Language
            </Label>
            <Input
              type="text"
              placeholder="English"
              value={language}
              onChange={(e) => setLanguage(e.target.value.toLowerCase())}
            />
            <p className="text-xs text-muted-foreground">
              The content will be created in this language.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className={cn('flex flex-col items-center justify-center w-full h-32 gap-3 border-2 rounded-md', selectedMethod === 'autopilot' && 'border-primary')}
              ariaSelected={selectedMethod === 'autopilot'}
              onClick={() => setSelectedMethod('autopilot')}
            >
              <span className="text-2xl">🤖</span>
              <span className="">AutoPilot</span>
            </button>
            <button
              className={cn('flex flex-col items-center justify-center w-full h-32 gap-3 border-2 rounded-md', selectedMethod === 'manual' && 'border-primary')}
              ariaSelected={selectedMethod === 'manual'}
              onClick={() => setSelectedMethod('manual')}
            >
              <span className="text-2xl">🧑</span>
              <span className="">Manual</span>
            </button>
          </div>
        </div>
        <DialogFooter>
          {(!language || !selectedMethod) && (
            <Button
              className="w-full py-4"
              type="button"
              size="lg"
              disabled={true}
            >
              Choose method
            </Button>
          )}
          {language && selectedMethod === 'autopilot' && (
            <CreateAutoPilotContentDialog language={language}>
              <Button
                className="w-full py-4"
                type="submit"
                size="lg"
              >
                Continue with AutoPilot 🤖
              </Button>
            </CreateAutoPilotContentDialog>
          )}
          {language && selectedMethod === 'manual' && (
            <CreateManualContentDialog language={language} >
              <Button
                className="w-full py-4"
                type="submit"
                size="lg"
              >
                Continue with manual 🧑
              </Button>
            </CreateManualContentDialog>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
