import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { PencilIcon } from "@heroicons/react/16/solid"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function MyAppCard({
  app,
}) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const form = useForm({
    defaultValues: {
      name: app.name || '',
      description: app.description || '',
      target_audience: app.target_audience || '',
    },
    resolver: zodResolver(z.object({
      name: z.string().min(3),
      description: z.string().min(50),
      target_audience: z.string().min(50),
    }))
  })

  return (
    <Card className="relative w-full p-6">
      <CardHeader>
        {!isEditing && (
          <Button className="absolute top-5 right-5" variant="outline" onClick={() => setIsEditing(true)}>
            <PencilIcon className="w-6 h-6 text-muted-foreground" />
          </Button>
        )}
        <CardTitle className="text-lg">
          Your app 😁
        </CardTitle>
        <CardDescription className="text-md">
          We'll use this information as context whenever creating your content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className={cn('space-y-4', !isEditing && 'opacity-50 pointer-events-none')}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="My app" {...field} />
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
                    Description (min. 50 characters)
                  </FormLabel>
                  <FormDescription>
                    Provide a description of your app.
                  </FormDescription>
                  <FormControl>
                    <Textarea placeholder="An app that leverages advanced AI to recommend sports betting placements." rows={4} {...field} />
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
                    Target audience (min. 50 characters)
                  </FormLabel>
                  <FormDescription>
                    Explain the target audience for your app.
                  </FormDescription>
                  <FormControl>
                    <Textarea placeholder="Professional and hobby sport bettors above the age of 18 who wish to gain an adventage in their day-to-day sports betting activity by leveraging AI." rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {!isEditing ? (
          <Button
            className="w-full"
            size="lg"
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit app ✏️
          </Button>
        ) : !form.formState.isDirty ? (
          <Button
            className="w-full"
            size="lg"
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel ❌
          </Button>
        ) : (
          <Button
            className="w-full"
            size="lg"
            disabled={!form.formState.isValid}
            onClick={() => console.log('update app')}
          >
            Update app 🚀
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
