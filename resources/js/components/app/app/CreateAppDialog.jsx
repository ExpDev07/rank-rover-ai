import * as React from "react"
import { router } from "@inertiajs/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import LanguagePicker from "@/components/app/language/LanguagePicker"

export default function CreateAppDialog({
  children,
}) {
  const [loading, setLoading] = React.useState(false)
  const [refresh, setRefresh] = React.useState(0)

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      target_audience: '',
      main_language: 'english',
    },
    resolver: zodResolver(z.object({
      name: z.string(),
      description: z.string().min(5),
      target_audience: z.string().min(3),
      main_language: z.string(),
    }))
  })

  const handleSelectLanguage = (language) => {
    form.setValue('main_language', language);
    setRefresh(refresh + 1)
  }

  const handleSubmit = (data) => {
    router.post('/apps', data, {
      onBefore: () => form.clearErrors(),
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
      onError: (errors) => Object.keys(errors).forEach((field) => form.setError(field, { message: errors[field] })),
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Create an app 📱
          </DialogTitle>
          <DialogDescription>
            Your app will be used as context whenever creating your content.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="py-6 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Todoly.ai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea rows="6" placeholder="An app that uses AI to organize your todos." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="target_audience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Your target audience
                  </FormLabel>
                  <FormControl>
                    <Textarea rows="6" placeholder="All people (above age 20) that wish to leverage AI to stay more organized." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <Label>
                Main Language
              </Label>
              <LanguagePicker
                value={form.getValues('main_language')}
                onChange={handleSelectLanguage}
              />
              <p className="text-xs text-muted-foreground">
                We'll select this language as default whenever creating your content.
              </p>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button
          className="w-full py-4"
          type="submit"
          size="lg"
          loading={loading}
          onClick={() => handleSubmit(form.getValues())}
        >
            Create app 📱
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
