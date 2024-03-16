import * as React from "react"
import { router, usePage } from "@inertiajs/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import LanguagePicker from "@/components/app/language/LanguagePicker"
import SelectableCard from "@/components/app/selectable/SelectableCard"

export default function CreateContentDialog({
  children,
}) {
  const page = usePage()
  const { app } = page.props

  const [language, setLanguage] = React.useState('english');
  const [size, setSize] = React.useState('medium')
  const [onlyTargetAudience, setOnlyTargetAudience] = React.useState(false)
  const [selectedMethod, setSelectedMethod] = React.useState('')
  const [selectedFormat, setSelectedFormat] = React.useState('')

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
      <DialogContent className="w-full max-w-2xl">
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
          <ScrollArea className="max-w-full whitespace-nowrap">
          <div className={cn('flex gap-4 w-max', !language && 'opacity-50 pointer-events-none')}>
            <SelectableCard
              className="shrink-0 max-w-48 h-28"
              isSelected={selectedFormat === 'blog_post'}
              onSelect={() => setSelectedFormat('blog_post')}
              emoji="📝"
              text="Blog Post"
            />
            <SelectableCard
              className="shrink-0 max-w-48 h-28"
              isSelected={selectedFormat === 'article'}
              onSelect={() => setSelectedFormat('article')}
              emoji="🗞️"
              text="Article"
            />
            <SelectableCard
              className="shrink-0 max-w-48 h-28"
              isSelected={selectedFormat === 'essay'}
              onSelect={() => setSelectedFormat('essay')}
              emoji="🖋️"
              text="Essay"
            />
            <SelectableCard
              className="shrink-0 max-w-48 h-28"
              isSelected={selectedFormat === 'how_to_guide_and_tutorial'}
              onSelect={() => setSelectedFormat('how_to_guide_and_tutorial')}
              emoji="🛠️"
              text="Guide & tutorial"
            />
            <SelectableCard
              className="shrink-0 max-w-48 h-28"
              isSelected={selectedFormat === 'frequently_asked_questions'}
              onSelect={() => setSelectedFormat('frequently_asked_questions')}
              emoji="❓"
              text="FAQ"
            />
            <SelectableCard
              className="shrink-0 max-w-48 h-28"
              isSelected={selectedFormat === 'lipsticles'}
              onSelect={() => setSelectedFormat('lipsticles')}
              emoji="🔢"
              text="Listicles"
            />
          </div>
          <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className={cn('flex gap-4', !selectedFormat && 'opacity-50 pointer-events-none')}>
            <SelectableCard
              isSelected={selectedMethod === 'autopilot'}
              onSelect={() => setSelectedMethod('autopilot')}
              emoji="🤖"
              text="AutoPilot"
              helpText="AutoPilot (🤖) will generate up to 8 pieces of recommendations for your selected content."
            />
            <SelectableCard
              isSelected={selectedMethod === 'manual'}
              onSelect={() => setSelectedMethod('manual')}
              emoji="🧑"
              text="Manual"
            />
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
          <div className={cn(!selectedMethod && 'opacity-50 pointer-events-none')}>
            <Select onValueChange={(value) => setSize(value)} defaultValue={size}>
              <SelectTrigger>
                <SelectValue placeholder="Select a length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="extra_long">Extra long</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className={cn('flex items-center space-x-2', !selectedMethod && 'opacity-50 pointer-events-none')}>
            <Switch id="target-audience"
              checked={onlyTargetAudience}
              onCheckedChange={setOnlyTargetAudience}
            />
            <Label htmlFor="target-audience">Only generate with target audience</Label>
          </div>
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
            {(!language || !selectedFormat || !selectedMethod || !size) && (
              <Button
                className="w-full py-4"
                type="button"
                size="lg"
                disabled={true}
              >
                Choose method
              </Button>
            )}
            {language && selectedFormat && size && selectedMethod === 'autopilot' && (
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
            {language && selectedFormat && size && selectedMethod === 'manual' && (
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
