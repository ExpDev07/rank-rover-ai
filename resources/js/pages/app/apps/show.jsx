import { Head } from "@inertiajs/react"

import Layout from "@/layouts/app"

import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"
import MyAppCard from "@/components/app/app/MyAppCard"
import StatisticsGrid from "@/components/app/statistic/StatisticsGrid"

export default function AppsShowPage({
  app,
  content,
}) {
  return (
    <Layout>
      <Head>
        <title>{app.name}</title>
      </Head>
      <PageHeader
        title="Hi, Marius!"
        description={`Keep up with the latest for ${app.name} here.`}
      />
      <main>
        <Section>
          <StatisticsGrid />
        </Section>
        <Section>
          <MyAppCard
            app={app}
          />
        </Section>
      </main>
    </Layout>
  )
}
