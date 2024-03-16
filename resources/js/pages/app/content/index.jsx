import * as React from "react"
import { router, Head } from "@inertiajs/react"

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
  // listen to changes
  content.map((c) => c.current_revision).filter((cRevision) => cRevision).forEach((cRevision) => {
    Echo.private(`contentRevisions.${cRevision.id}`).listen('ContentRevisionStatusChangedEvent', (e) => {
      router.reload({ only: ['content', 'content_cluster'], preserveState: true })
    });
  })

  return (
    <Layout>
      <Head>
        <title>Your content</title>
      </Head>
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
