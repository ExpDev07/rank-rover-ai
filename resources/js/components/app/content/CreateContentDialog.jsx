import * as React from "react"
import { router, usePage } from "@inertiajs/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import LanguagePicker from "@/components/app/language/LanguagePicker"

export default function CreateContentDialog({
  children,
}) {
  const page = usePage()
  const { app } = page.props

  const [language, setLanguage] = React.useState('english');
  const [selectedMethod, setSelectedMethod] = React.useState('')

  const [manualWorking, setManualWorking] = React.useState(false)
  const [autopilotWorking, setAutopilotWorking] = React.useState(false)

  const manualForm = useForm({
    defaultValues: {
      title: '',
      keywords: '',
    },
    resolver: zodResolver(z.object({
      title: z.string().min(5),
      keywords: z.string().min(3),
    }))
  })

  const handleCreateContent = (data) => {
    router.post(`/app/${app.slug}/content`, {
      ...data,
      language: language,
      keywords: data.keywords.split(', '),
    }, {
      preserveState: false,
      preserveScroll: false,
      onBefore: () => manualForm.clearErrors(),
      onStart: () => setManualWorking(true),
      onFinish: () => setManualWorking(false),
      onError: (errors) => Object.keys(errors).forEach((field) => manualForm.setError(field, { message: errors[field] })),
    })
  }

  const handleCreateContentCluster = () => {
    router.post(`/app/${app.slug}/content-cluster`, {
      language,
    }, {
      preserveState: false,
      preserveScroll: false,
      onStart: () => setAutopilotWorking(true),
      onFinish: () => setAutopilotWorking(false),
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
            Let's create some content 🚀
          </DialogTitle>
          <DialogDescription>
            You can create content manually or on AutoPilot. Both leverages AI, but AutoPilot will recommend content for you.
          </DialogDescription>
        </DialogHeader>
        <div className={cn('py-6 space-y-8', autopilotWorking || manualWorking && 'pointer-events-none opacity-50')}>
          <div className="flex flex-col gap-2">
            <Label>
              Language
            </Label>
            <LanguagePicker
              value={language}
              onChange={setLanguage}
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
          {selectedMethod === 'manual' && (
            <Form {...manualForm}>
              <form className="space-y-6">
                <FormField
                  control={manualForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="How SEO can drive organic traffic to your app" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={manualForm.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Keywords
                      </FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="seo, ai, traffic" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
        </div>
        <DialogFooter>
          <div className="w-full">
            {autopilotWorking && (
              <ul className="flex flex-col items-center justify-center w-full mb-6 gap-y-4">
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
              <Button
                className="w-full py-4"
                type="submit"
                size="lg"
                loading={autopilotWorking}
                onClick={() => handleCreateContentCluster()}
              >
                Create content with AutoPilot 🤖
              </Button>
            )}
            {language && selectedMethod === 'manual' && (
              <Button
                className="w-full py-4"
                type="submit"
                size="lg"
                loading={manualWorking}
                onClick={() => handleCreateContent(manualForm.getValues())}
              >
                Create content 🧑
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
