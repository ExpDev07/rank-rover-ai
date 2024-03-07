import { marked } from "marked"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Layout from "@/layouts/layout"

export default function AppIndexPage({ article }) {
  /*
  const form = useForm({
    defaultValues: {
      app: '',
      language: '',
      style: '',
      keywords: '',
    },
    resolver: zodResolver(z.object({
      app: z.string().required(),
      language: z.string().required(),
      style: z.string().required(),
      keywords: z.string().required(),
    })),
  })
  */

  return (
    <Layout className="py-24">
      <div className="container mx-auto">
        <article className="prose prose-lg" dangerouslySetInnerHTML={{ __html: marked.parse(article) }} />
      </div>
    </Layout>
  )
}
