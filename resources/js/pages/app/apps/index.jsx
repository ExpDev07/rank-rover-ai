import { marked } from "marked"

import Layout from "@/layouts/app"

import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"
import AppsGrid from "@/components/app/app/AppsGrid"

export default function AppsShowPage({
  apps,
}) {
  return (
    <Layout>
      <PageHeader
        title="Your apps 📱"
        description="Manage your apps."
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
