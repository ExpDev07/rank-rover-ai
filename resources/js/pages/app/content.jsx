import Layout from "@/layouts/app"

import { Button } from "@/components/ui/button"

import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"
import ContentGrid from "@/components/app/content/ContentGrid"

export default function ContentPage() {
  return (
    <Layout>
      <PageHeader
        title="Your content"
        description="Manage all your content."
        actions={(
          <Button>
            Create content 🚀
          </Button>
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
