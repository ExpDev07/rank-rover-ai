import { marked } from "marked"

import Layout from "@/layouts/app"

import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"
import AppCard from "@/components/app/app/AppCard"

export default function AppIndexPage({ article }) {
  return (
    <Layout>
      <PageHeader
        title="App"
        description="Your app here."
      />
      <main>
        <Section>
          <AppCard />
        </Section>
        <Section>
          {article && (
            <article className="py-16 prose prose-lg" dangerouslySetInnerHTML={{ __html: marked.parse(article.content) }} />
          )}
        </Section>
      </main>
    </Layout>
  )
}
