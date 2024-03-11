import { Head, Link } from "@inertiajs/react"
import { ChatBubbleLeftIcon, BanknotesIcon, BellAlertIcon } from '@heroicons/react/24/outline'

import Layout from "@/layouts/web"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import PricingGrid from "@/components/common/pricing/PricingGrid"

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

  const prices = [
    {
      popular: false,
      title: 'Basic',
      monthlyPrice: 15,
      yearlyPrice: 100,
      description: 'Essential features you need to get started.',
      features: [
        'Create one app',
        'Generate 5x content daily',
        'AI recommended keywords',
        'Tweak your content with AI',
        '24/7 support',
      ],
    },
    {
      popular: true,
      title: 'Pro',
      monthlyPrice: 40,
      yearlyPrice: 150,
      description: 'Perfect for owners of small & medium businessess.',
      features: [
        'Create 10x apps',
        'Generate 50x content daily',
        'AI recommended keywords',
        'Tweak your content with AI',
        '24/7 support',
      ],
    },
    {
      popular: false,
      title: 'Enterprise',
      monthlyPrice: 99,
      yearlyPrice: 200,
      description: 'Dedicated support and infrastructure to fit your needs.',
      features: [
        'Create 50x apps',
        'Generate 100x content daily',
        'AI recommended keywords',
        'Tweak your content with AI',
        '24/7 support',
        'Priority feature requests',
      ],
    }
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
      <header className="container grid items-center grid-cols-1 py-12 mx-auto overflow-x-hidden text-black bg-white lg:grid-cols-12 lg:py-32 gap-x-28 gap-y-12">
        <div className="col-span-1 lg:col-span-7">
          <Badge className="mb-4">
            1000x traffic!
          </Badge>
          <h1 className="mb-4 text-4xl font-bold leading-tight lg:text-6xl">
            <span className="text-primary">Elevate</span> Your Digital Presence with AI-Powered Content
          </h1>
          <p className="mb-8 text-lg leading-relaxed lg:text-xl text-muted-foreground">
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
              Learn more 🤔
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
            <h2 className="mb-8 text-3xl font-bold">
              What we offer ❤️
            </h2>
          </header>
          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <li className="p-8 text-black bg-white border border-gray-200 rounded-md shadow-sm" key={feature.name}>
                <feature.icon
                  className="w-12 h-12 mb-6 text-rose-400"
                />
                <h3 className="mb-2 text-lg font-medium">
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
      <section className="py-12 text-black bg-white lg:py-24">
        <div className="container mx-auto">
          <header>
            <h2 className="mb-8 text-3xl font-bold">
              Get started today 🚀
            </h2>
          </header>
          <PricingGrid
            prices={prices}
          />
        </div>
      </section>
      <section className="py-12 text-black bg-rose-100 lg:py-24">
        <div className="container mx-auto">
          <header>
            <h2 className="mb-8 text-3xl font-bold">
              Latest from us 🌍
            </h2>
          </header>
          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {articles.map((article) => (
              <li className="flex flex-col bg-white border border-gray-200 rounded-md shadow-sm" key={article.title}>
                <img
                  className="object-cover w-full h-56"
                  src={`https://meldsmitte.no/images/blog/${article.poster}`}
                  alt={article.slug}
                />
                <main className="flex-1 px-4 py-6 lg:p-6">
                  <h3 className="mb-2 font-medium text-md">
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {article.ingress}
                  </p>
                </main>
                <footer className="px-4 pb-4 lg:p-6">
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`/blogg/${article.slug}`}>
                      Read more
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
