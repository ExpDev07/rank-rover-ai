import { Button } from "@/components/ui/button"

import Layout from "@/layouts/app"
import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"
import ContentGrid from "@/components/app/content/ContentGrid"
import CreateContentDialog from "@/components/app/content/CreateContentDialog"

export default function ContentIndexPage() {
  return (
    <Layout>
      <PageHeader
        title="Your content"
        description="Manage all your content."
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
          <ContentGrid />
        </Section>
      </main>
    </Layout>
  )
}
