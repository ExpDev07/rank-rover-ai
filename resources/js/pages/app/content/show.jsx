import * as React from "react"
import { router } from "@inertiajs/react"
import { marked } from "marked"
import { ArrowPathIcon } from '@heroicons/react/24/solid'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Layout from "@/layouts/app"
import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"

export default function ContentShowPage({
  app,
  content,
}) {
  // poll for changes
  if (! content.current_revision || content.current_revision.status === 'idle' || content.current_revision.status === 'generating') {
    setTimeout(() => {
      router.get(`/app/${app.slug}/content/${content.slug}`, {}, { only: ['content'] })
    }, 10000)
  }

  const [loadingRetry, setLoadingRetry] = React.useState(false)

  const [loadingTweak, setLoadingTweak] = React.useState(false)
  const [tweak, setTweak] = React.useState('')

  const handleRetry = () => {
    router.post(`/app/${app.slug}/content/${content.slug}/retry`, {}, { only: ['content'] })
  }

  const handleTweak = () => {
    router.post(`/app/${app.slug}/content/${content.slug}/tweak`, { tweak }, { only: ['content'] })
  }

  const handleCopyToMarkdown = () => {
    navigator.clipboard.writeText(content.current_revision?.content_md);
  }

  return (
    <Layout>
      <PageHeader
        title={content.title}
        description="Manage this content"
        icon={(
          <img
            className="w-12 h-12"
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${content.title}`}
            alt={content.title}
          />
        )}
      />
      <main>
        <Section className="grid grid-cols-12 gap-24">
          <div className="col-span-7">
            {!content.current_revision && (
              <div className="flex flex-col items-center justify-center w-full h-full border-2 rounded-md">
                <ArrowPathIcon className="w-12 h-12 animate-spin text-muted-foreground" />
              </div>
            )}
            {content.current_revision?.status === 'generating' && (
              <div className="flex flex-col items-center justify-center w-full h-full border-2 rounded-md">
                <ArrowPathIcon className="w-12 h-12 animate-spin text-muted-foreground" />
              </div>
            )}
            {content.current_revision?.status === 'errored' && (
              <div className="flex flex-col items-center justify-center w-full h-full border-2 rounded-md">
                <h4 className="mb-2 text-2xl text-destructive">
                  Could not create content
                </h4>
                <p className="mb-6 text-muted-foreground text-md">
                  Something wrong happened while creating your content.
                </p>
                <Button onClick={() => handleRetry()}>
                  Retry now
                </Button>
              </div>
            )}
            {content.current_revision?.status === 'generated' && content.current_revision?.content_md && (
              <article
                className="prose prose-md"
                dangerouslySetInnerHTML={{ __html: marked.parse(content.current_revision.content_md) }}
              />
            )}
          </div>
          <div className="col-span-5 -mt-24 space-y-4">
            <Card className="p-3">
              <CardHeader>
                <CardTitle>
                  SEO 🚀
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-x-1">
                  {content.keywords.map((keyword, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="p-3">
              <CardHeader>
                <CardTitle>
                  Tweak your content 🛠️
                </CardTitle>
                <CardDescription>
                  Make tweaks to your content by talking to our AI.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write more about the impact backlinking has on SEO"
                  rows="6"
                  onChange={(e) => setTweak(e.target.value)}
                />
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={tweak.length < 30}
                  onClick={() => handleTweak()}
                >
                  Send tweak 🛠️
                </Button>
              </CardFooter>
            </Card>
            <Card className="p-3">
              <CardHeader>
                <CardTitle>
                  Save to somewhere 📠
                </CardTitle>
                <CardDescription>
                  Take your content with you to where you like.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => handleCopyToMarkdown()}
                >
                  Copy as markdown (MD) 🧲
                </Button>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>
    </Layout>
  )
}
