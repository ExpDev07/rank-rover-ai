import * as React from "react"
import { router } from "@inertiajs/react"

import { Button } from "@/components/ui/button"

import Layout from "@/layouts/app"
import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"
import ContentGrid from "@/components/app/content/ContentGrid"
import CreateContentDialog from "@/components/app/content/CreateContentDialog"
import ContentClusterDialog from "@/components/app/content-cluster/ContentClusterDialog"

export default function ContentIndexPage({
  app,
  content,
  content_cluster,
}) {
  // poll for changes
  setTimeout(() => {
    // router.reload({ only: ['content', 'content_cluster'], preserveState: true })
  }, 10000)

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
        {content_cluster && (
          <ContentClusterDialog
            contentCluster={content_cluster}
            defaultOpen={true}
            onOpenChange={() => router.get(`/app/${app.slug}/content`)}
          />
        )}
        <Section>
          <ContentGrid
            content={content}
          />
        </Section>
      </main>
    </Layout>
  )
}
