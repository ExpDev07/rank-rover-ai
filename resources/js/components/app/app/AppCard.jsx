import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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

export default function AppCard() {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      target_audience: '',
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
        <CardTitle className="text-lg">
          Your app 😁
        </CardTitle>
        <CardDescription className="text-md">
          We'll use this information as context whenever creating your content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
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
                    Description
                  </FormLabel>
                  <FormDescription>
                    Provide a description of your app.
                  </FormDescription>
                  <FormControl>
                    <Textarea placeholder="An app that leverages advanced AI to recommend sports betting placements." {...field} />
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
                    Target audience
                  </FormLabel>
                  <FormDescription>
                    Explain the target audience for your app.
                  </FormDescription>
                  <FormControl>
                    <Textarea placeholder="Our target audience is professional and hobby sport bettors over the age of 18 who wish to gain an extra adventage in their day-to-day sports betting activity by leveraging AI." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          type="submit"
          disabled={!form.formState.isDirty}
          onClick={() => console.log('update app')}
        >
          Update app ⚙️
        </Button>
      </CardFooter>
    </Card>
  )
}
