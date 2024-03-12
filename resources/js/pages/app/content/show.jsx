import * as React from "react"
import { marked } from "marked"
import { Share2Icon } from "@radix-ui/react-icons"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Layout from "@/layouts/app"
import PageHeader from "@/components/app/page/PageHeader"
import Section from "@/components/app/section/Section"

export default function ContentShowPage({
  content,
}) {
  const handleCopyToMarkdown = () => {
    navigator.clipboard.writeText(content.content_md);
  }

  return (
    <Layout>
      <main>
        <Section className="grid grid-cols-12 gap-24">
          <div className="col-span-7">
            <article
              className="prose prose-md"
              dangerouslySetInnerHTML={{ __html: marked.parse(content.content_md.replace('# How SEO can drive organic traffic to your app', '')) }}
            />
          </div>
          <div className="col-span-5 space-y-4">
            <Card className="p-3">
              <CardHeader>
                <CardTitle>
                  SEO 🚀
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-x-1">
                  {content.keywords.map((keyword, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="p-3">
              <CardHeader>
                <CardTitle>
                  Tweak your content 🛠️
                </CardTitle>
                <CardDescription>
                  Make tweaks to your content by talking to our AI.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write more about the impact backlinking has on SEO"
                  rows="6"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={true}>
                  Send tweak 🛠️
                </Button>
              </CardFooter>
            </Card>
            <Card className="p-3">
              <CardHeader>
                <CardTitle>
                  Save to somewhere 📠
                </CardTitle>
                <CardDescription>
                  Take your content with you to where you like.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => handleCopyToMarkdown()}
                >
                  Copy as markdown (MD) 🧲
                </Button>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>
    </Layout>
  )
}
