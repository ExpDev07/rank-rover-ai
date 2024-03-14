import * as React from "react"
import { router } from "@inertiajs/react"

import { Button } from "@/components/ui/button"

import Layout from "@/layouts/app"
import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"
import ContentGrid from "@/components/app/content/ContentGrid"
import CreateContentDialog from "@/components/app/content/CreateContentDialog"
import RecommendedContentGrid from "@/components/app/content/RecommendedContentGrid"

export default function ContentIndexPage({
  app,
  content,
  content_clusters,
}) {
  // poll for changes
  if (content.map(c => c.current_revision).find((r) => !r || r.status === 'idle' || r.status === 'generating')) {
    setTimeout(() => {
      router.reload({ only: ['content'], preserveState: true })
    }, 10000)
  }

  return (
    <Layout>
      <PageHeader
        title="Your content"
        description="All your content here."
        actions={(
          <CreateContentDialog>
            <Button>
              Create content 🚀
            </Button>
          </CreateContentDialog>
        )}
      />
      <main>
        <Section>
          <ContentGrid
            content={content}
          />
        </Section>
        <Section>
          <RecommendedContentGrid
            recommendedContent={content_clusters.flatMap(c => c.recommendations.map((r) => ({ ...r, language: c.language })))}
          />
        </Section>
      </main>
    </Layout>
  )
}
