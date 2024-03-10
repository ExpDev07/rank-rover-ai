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

const languages = [
  { label: "English", value: "en" },
  { label: "Norwegian", value: "nb" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
]

export default function CreateContentDialog({
  children,
}) {
  const form = useForm({
    defaultValues: {
      language: '',
      title: '',
      keywords: '',
    },
    resolver: zodResolver(z.object({
      language: z.string(),
      title: z.string().min(5),
      keywords: z.string().min(3),
    }))
  })

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
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Language
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language.value === field.value
                              )?.label
                            : "Select language"}
                          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search language..."
                          className="h-9"
                        />
                        <CommandEmpty>
                          No language found.
                        </CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.setValue("language", language.value)
                              }}
                            >
                              {language.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  language.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the language the content will be created in.
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
          <Button className="w-full py-4" type="submit" size="lg">
            Create the content 🚀
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
