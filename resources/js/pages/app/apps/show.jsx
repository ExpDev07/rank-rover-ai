import { marked } from "marked"

import Layout from "@/layouts/app"

import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"
import SectionHeader from "@/components/app/section/SectionHeader"
import MyAppCard from "@/components/app/app/MyAppCard"
import StatisticsGrid from "@/components/app/statistic/StatisticsGrid"
import ContentGrid from "@/components/app/content/ContentGrid"

export default function AppsShowPage({ article }) {
  return (
    <Layout>
      <PageHeader
        title="Hi, Marius!"
        description="Keep up with the latest here."
      />
      <main>
        <Section>
          <StatisticsGrid />
        </Section>
        <Section>
          <MyAppCard />
        </Section>
        <Section>
          <SectionHeader
            title="Content"
          />
          <ContentGrid />
        </Section>
        <Section>
          <SectionHeader
            title="Article"
          />
          {article && (
            <article className="py-16 prose prose-lg" dangerouslySetInnerHTML={{ __html: marked.parse(article.content) }} />
          )}
        </Section>
      </main>
    </Layout>
  )
}