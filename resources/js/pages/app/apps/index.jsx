import { Head } from "@inertiajs/react"

import Layout from "@/layouts/app"

import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"
import AppsGrid from "@/components/app/app/AppsGrid"

export default function AppsShowPage({
  apps,
}) {
  return (
    <Layout>
      <Head>
        <title>Your apps</title>
      </Head>
      <PageHeader
        title="Your apps 📱"
        description="We use your app as context whenever generating content for it."
      />
      <main>
        <Section>
          <AppsGrid
            apps={apps}
          />
        </Section>
      </main>
    </Layout>
  )
}
