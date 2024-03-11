import { marked } from "marked"

import Layout from "@/layouts/app"

import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"
import AppsGrid from "@/components/app/app/AppsGrid"

const apps = [
  { name: 'RankRover.ai', description: 'An app that leverages AI to create engaging content for SEO.' },
  { name: 'MeldSmitte.no', description: 'Anonomously notify previous sexual partners that you tested positive.' }
]

export default function AppsShowPage({ article }) {
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
