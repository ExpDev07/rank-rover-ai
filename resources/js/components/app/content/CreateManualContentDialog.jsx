import { router, usePage } from "@inertiajs/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Component1Icon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
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

export default function CreateManualContentDialog({
  language,
  children,
}) {
  const page = usePage()
  const { app } = page.props

  const form = useForm({
    defaultValues: {
      title: '',
      keywords: '',
    },
    resolver: zodResolver(z.object({
      title: z.string().min(5),
      keywords: z.string().min(3),
    }))
  })

  const handleSubmit = (data) => {
    router.post(`/app/${app.slug}/content`, {
      ...data,
      language: language,
      keywords: data.keywords.split(', '),
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
            Create content 🚀
          </DialogTitle>
          <DialogDescription>
            Choose a title and the keywords you wish to create the content from, and we'll do the rest.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="py-6 space-y-6">
            <FormField
              control={form.control}
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
              control={form.control}
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
        <DialogFooter>
          <Button
            className="w-full py-4"
            type="submit"
            size="lg"
            onClick={() => handleSubmit(form.getValues())}
          >
            Create the content 🚀
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
