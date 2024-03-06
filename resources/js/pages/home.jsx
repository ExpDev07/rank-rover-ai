import { Head, Link } from "@inertiajs/react"
import { ChatBubbleLeftIcon, BanknotesIcon, BellAlertIcon } from '@heroicons/react/24/outline'

import Layout from "@/layouts/layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const features = [
    {
      name: 'Dynamic Content Generation',
      description: 'Create captivating, SEO-driven articles tailored to your business needs.',
      icon: ChatBubbleLeftIcon,
    },
    {
      name: 'Multilingual Support',
      description: 'Break language barriers. Generate content in multiple languages to reach a global audience.',
      icon: BanknotesIcon,
    },
    {
      name: 'Keyword Optimization',
      description: 'Input your target keywords and let our AI craft content that climbs the search engine ranks.',
      icon: BellAlertIcon,
    },
    {
      name: 'Stylistic Flexibility',
      description: 'Choose from various writing styles to match your brand\'s voice and audience\'s preferences.',
      icon: BellAlertIcon,
    },
    {
      name: 'Format Versatility',
      description: 'Input your target keywords and let our AI craft content that climbs the search engine ranks.',
      icon: BellAlertIcon,
    },
    {
      name: 'Keyword Optimization',
      description: 'Export your content in multiple formats including markdown, semantic HTML, and JSON for seamless integration.',
      icon: BellAlertIcon,
    },
  ]

  const articles = [
    {
      title: 'Å Navigere Samtalen: Å Fortelle Din Partner Om en Kjønnssykdom',
      ingress: 'En guide til hvordan man på en respektfull og ansvarlig måte kan fortelle en partner om en kjønnssykdom.',
      slug: 'aa-navigere-samtalen-aa-fortelle-din-partner-om-en-kjoonnssykdom',
      poster: 'yellow.jpg',
    },
    {
      title: 'Forståelse av Kjønnssykdommer: Symptomer, Typer og Behandlinger',
      ingress: 'En omfattende guide til symptomer, overføringsmetoder, og behandling av vanlige kjønnssykdommer.',
      slug: 'forstaaelse-av-kjoonnssykdommer-symptomer-typer-og-behandlinger',
      poster: 'window.png',
    },
    {
      title: 'Myteknusing: Vanlige Misforståelser om Kjønnssykdommer',
      ingress: 'En gjennomgang av vanlige myter om kjønnssykdommer (STIer), og fakta som motbeviser disse misforståelsene for å fremme bedre seksuell helseforståelse.',
      slug: 'myteknusing-vanlige-misforstaaelser-om-kjoonnssykdommer',
      poster: 'clover.jpg',
    },
  ]

  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name="description" content="In the digital age, standing out online is paramount. RankRover.ai harnesses the power of AI to craft SEO-optimized articles that resonate with your audience and search engines alike. Say goodbye to content creation hurdles and hello to effortless ranking success." />
        <meta name="keywords" content="seo" />
        <meta name="robots" content="index, follow" />
      </Head>
      <header className="bg-white text-black container grid items-center overflow-x-hidden grid-cols-1 lg:grid-cols-12 py-12 lg:py-32 mx-auto gap-x-28 gap-y-12">
        <div className="col-span-1 lg:col-span-7">
          <Badge className="mb-4">
            1000x traffic!
          </Badge>
          <h1 className="mb-4 text-4xl lg:text-6xl font-bold leading-tight">
            <span className="text-primary">Elevate</span> Your Digital Presence with AI-Powered Content
          </h1>
          <p className="mb-8 text-lg lg:text-xl leading-relaxed text-muted-foreground">
            Generate engaging, optimized content tailored your business that drives traffic and boosts your ranking 
            with ease. It's really that simple!
          </p>
          <div className="flex items-center gap-x-2">
            <Button size="lg" asChild>
              <Link href="/varsel">
                Get started 🌟
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn more
            </Button>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-5">
          <img
            className="object-cover w-full h-full"
            src="http://localhost:8000/images/notepad.jpg"
            alt="notepad"
          />
        </div>
      </header>
      <section className="py-12 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <header>
            <h2 className="text-3xl font-bold mb-8">
              What we offer ❤️
            </h2>
          </header>
          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <li className="rounded-md border shadow-sm bg-white border-gray-200 p-8" key={feature.name}>
                <feature.icon
                  className="h-12 w-12 text-rose-600 mb-4"
                />
                <h3 className="font-medium text-lg mb-2">
                  {feature.name}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-12 lg:py-24 bg-white text-black">
        <div className="container mx-auto">
          <header>
            <h2 className="text-3xl font-bold mb-8">
              Latest from us 🌍
            </h2>
          </header>
          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <li className="flex flex-col rounded-md border shadow-sm bg-white border-gray-200" key={article.title}>
                <img
                  className="object-cover w-full h-56"
                  src={`https://meldsmitte.no/images/blog/${article.poster}`}
                  alt={article.slug}
                />
                <main className="px-4 py-6 lg:p-6 flex-1">
                  <h3 className="font-medium text-md mb-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {article.ingress}
                  </p>
                </main>
                <footer className="px-4 pb-4 lg:p-6">
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`/blogg/${article.slug}`}>
                      Les mer
                    </Link>
                  </Button>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}
