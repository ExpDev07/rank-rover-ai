import * as React from 'react'
import { router, Head, Link } from "@inertiajs/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false)

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember_me: true,
    },
    resolver: zodResolver({
      email: z.string().email(),
      password: z.string(),
      remember_me: z.boolean(),
    }),
  })

  const handleSubmit = (data) => {
    router.post('/login', data, {
      onBefore: () => form.clearErrors(),
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
      onError: (errors) => Object.keys(errors).forEach((field) => form.setError(field, { message: errors[field] })),
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-3">
      <Head>
        <title>Login</title>
        <meta name="description" content="Log in to your account to access RankRover.ai." />
        <meta name="keywords" content="seo, ai, traffic, SaaS, chatgpt, tools, content, content generation, login" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Button className="absolute z-50 top-5 left-5" variant="outline" asChild>
        <Link href="/">
          Back to home 🛑
        </Link>
      </Button>
      <svg
        className="fixed inset-0 brightness-75"
        viewBox="0 0 1920 1080"
        width="1920"
        height="1080"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <rect x="0" y="0" width="1920" height="1080" fill="#001220"></rect><defs><linearGradient id="grad1_0" x1="43.8%" y1="0%" x2="100%" y2="100%"><stop offset="14.444444444444446%" stopColor="#001220" stopOpacity="1"></stop><stop offset="85.55555555555554%" stopColor="#001220" stopOpacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_0" x1="0%" y1="0%" x2="56.3%" y2="100%"><stop offset="14.444444444444446%" stopColor="#001220" stopOpacity="1"></stop><stop offset="85.55555555555554%" stopColor="#001220" stopOpacity="1"></stop></linearGradient></defs><g transform="translate(1920, 0)"><path d="M0 972C-132.9 965.5 -265.8 959 -372 898C-478.1 837.1 -557.5 721.7 -618 618C-678.5 514.4 -720.2 422.5 -776.1 321.5C-831.9 220.4 -902 110.2 -972 0L0 0Z" fill="#5b21b6"></path></g><g transform="translate(0, 1080)"><path d="M0 -972C113.3 -900.4 226.6 -828.8 315.3 -761.3C404.1 -693.7 468.3 -630.3 573.5 -573.5C678.6 -516.6 824.8 -466.4 898 -372C971.3 -277.5 971.6 -138.7 972 0L0 0Z" fill="#2563eb"></path></g>
      </svg>
      <Card className="relative w-full max-w-xl p-6 shadow-lg">
        <CardHeader>
          <img
            className="w-32 pb-0 pr-4 mb-4 border-b"
            src="http://localhost:8000/images/logo.png"
            alt="RankRover.ai"
          />
          <CardTitle className="text-2xl text-primary">
            Welcome back! 😊
          </CardTitle>
          <CardDescription className="text-md">
            You can log in to your account below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="pb-6 space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.org" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="************" {...field} />
                    </FormControl>
                    <FormDescription>
                      Forgot your password? <Link className="text-primary hover:underline" href="/">Reset now</Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remember_me"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-y-0 gap-x-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            className="w-full py-6 mb-6 text-md"
            type="submit"
            size="lg"
            loading={loading}
            onClick={() => handleSubmit(form.getValues())}
          >
            Log in <span className="ml-2 text-lg -translate-y-1">👉</span>
          </Button>
          <p className="text-sm text-muted-foreground">
            Don't have an account? <Link className="text-primary hover:underline" href="/register">Create one now</Link>.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
