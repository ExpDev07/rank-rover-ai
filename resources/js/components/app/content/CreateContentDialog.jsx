import { router, usePage } from "@inertiajs/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon, Component1Icon } from "@radix-ui/react-icons"
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

export default function CreateContentDialog({
  children,
}) {
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

  const page = usePage()
  const { app } = page.props

  const form = useForm({
    defaultValues: {
      language: 'English',
      title: '',
      keywords: '',
    },
    resolver: zodResolver(z.object({
      language: z.string(),
      title: z.string().min(5),
      keywords: z.string().min(3),
    }))
  })

  const handleSubmit = (data) => {
    router.post(`/app/${app.slug}/content`, {
      ...data,
      keywords: data.keywords.split(', '),
    }, {
      preserveState: false,
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
            Let's create some content 🚀
          </DialogTitle>
          <DialogDescription>
            To create your content we'll need some short info about what content you're creating and the keywords you want to be focused on.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="py-6 space-y-4">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Language
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="English" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={cn('space-y-4', !form.getValues("language") && 'opacity-50 pointer-events-none')}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-x">
                        <Input className="flex-1" type="text" placeholder="How SEO can drive organic traffic to your app" {...field} />
                        <Button size="sm" variant="link">
                          <Component1Icon className="w-5 h-5 text-primary" />
                        </Button>
                      </div>
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
                      <div className="flex items-center gap-x">
                        <Input className="flex-1" type="text" placeholder="seo, ai, traffic" {...field} />
                        <Button size="sm" variant="link">
                          <Component1Icon className="w-5 h-5 text-primary" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
