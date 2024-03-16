import { Head } from "@inertiajs/react"
import { marked } from "marked"

import Layout from "@/layouts/article"

export default function PricingPage({
  title,
  keywords,
  description,
  content_md,
}) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        <meta name="robots" content="index, follow" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: marked.parse(content_md) }} />
    </Layout>
  )
}
