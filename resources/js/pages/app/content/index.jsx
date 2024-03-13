import * as React from "react"
import { router } from "@inertiajs/react"

import { Button } from "@/components/ui/button"

import Layout from "@/layouts/app"
import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"
import ContentGrid from "@/components/app/content/ContentGrid"
import CreateContentDialog from "@/components/app/content/CreateContentDialog"

export default function ContentIndexPage({
  app,
  content,
}) {
  // poll for changes
  if (content.map(c => c.current_revision).find((r) => !r || r.status === 'idle' || r.status === 'generating')) {
    setTimeout(() => {
      router.get(`/app/${app.slug}/content`, {}, { only: ['content'] })
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
      </main>
    </Layout>
  )
}
