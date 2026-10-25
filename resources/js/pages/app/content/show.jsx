import * as React from "react"
import { router, Head } from "@inertiajs/react"
import { marked } from "marked"
import { ArrowPathIcon } from '@heroicons/react/24/solid'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
  const [loadingRetry, setLoadingRetry] = React.useState(false)

  const [loadingTweak, setLoadingTweak] = React.useState(false)
  const [tweak, setTweak] = React.useState('')
  const [generationError, setGenerationError] = React.useState('')
  const [tweakError, setTweakError] = React.useState('')

  const isGenerating = content.content_queued || content.current_revision?.status === 'idle' || content.current_revision?.status === 'generating'

  React.useEffect(() => {
    if (!isGenerating || loadingRetry || loadingTweak) return

    const timer = setTimeout(() => {
      router.reload({ only: ['content'], preserveState: true })
    }, 10000)

    return () => clearTimeout(timer)
  }, [content, isGenerating, loadingRetry, loadingTweak])

  const clearErrors = () => {
    setGenerationError('')
    setTweakError('')
  }

  const handleRetry = () => {
    router.post(`/app/${app.slug}/content/${content.slug}/retry`, {}, {
      only: ['content', 'errors'],
      preserveState: true,
      onBefore: clearErrors,
      onStart: () => setLoadingRetry(true),
      onFinish: () => setLoadingRetry(false),
      onError: (errors) => setGenerationError(errors.generation || ''),
    })
  }

  const handleTweak = () => {
    router.post(`/app/${app.slug}/content/${content.slug}/tweak`, { tweak }, {
      only: ['content', 'errors'],
      preserveState: true,
      onBefore: clearErrors,
      onStart: () => setLoadingTweak(true),
      onFinish: () => setLoadingTweak(false),
      onError: (errors) => {
        setGenerationError(errors.generation || '')
        setTweakError(errors.tweak || '')
      },
      onSuccess: () => setTweak(''),
    })
  }

  const handleCopyToMarkdown = () => {
    navigator.clipboard.writeText(content.current_revision?.content_md);
  }

  return (
    <Layout>
      <Head>
        <title>{content.title}</title>
      </Head>
      <div className="relative grid grid-cols-12 gap-24">
        <div className="col-span-7">
          <PageHeader
            title={content.title}
            description="Manage this content"
            icon={(
              <img
                className="w-14 h-14"
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${content.title}`}
                alt={content.title}
              />
            )}
          />
          <Section className="mt-10">
            {generationError && (
              <p role="alert" className="mb-4 text-sm text-destructive">
                {generationError}
              </p>
            )}
            {isGenerating && (
              <div className="flex flex-col items-center justify-center w-full border-2 rounded-md h-52">
                <ArrowPathIcon className="w-12 h-12 animate-spin text-muted-foreground" />
              </div>
            )}
            {!isGenerating && (!content.current_revision || content.current_revision.status === 'errored') && (
              <div className="flex flex-col items-center justify-center w-full border-2 rounded-md h-52">
                <h4 className="mb-2 text-2xl text-destructive">
                  Could not create content
                </h4>
                <p className="mb-6 text-muted-foreground text-md">
                  Something wrong happened while creating your content.
                </p>
                <Button
                  disabled={loadingRetry}
                  loading={loadingRetry}
                  onClick={() => handleRetry()}
                >
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
          </Section>
        </div>
        <div className="col-span-5 space-y-4 ">
          <Card className="p-3">
            <CardHeader>
              <CardTitle>
                SEO 🚀
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="mb-3" variant="secondary">
                {content.slug}
              </Badge>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {content.keywords.map((keyword, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
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
                value={tweak}
                aria-invalid={!!tweakError}
                aria-describedby={tweakError ? 'tweak-error' : undefined}
                onChange={(e) => setTweak(e.target.value)}
              />
              {tweakError && (
                <p id="tweak-error" role="alert" className="mt-2 text-sm text-destructive">
                  {tweakError}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={tweak.length < 20 || loadingTweak || content.current_revision?.status !== 'generated'}
                loading={loadingTweak}
                onClick={() => handleTweak()}
              >
                Send tweak 🛠️
              </Button>
            </CardFooter>
          </Card>
          {content.current_revision?.status === 'generated' && (
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
          )}
        </div>
      </div>
    </Layout>
  )
}
