import * as React from "react"
import { usePage, Link } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import {
  HomeIcon,
  RectangleGroupIcon,
  DocumentCheckIcon,
} from "@heroicons/react/16/solid"

export default function DashboardSidebar() {
  const page = usePage()
  const { app } = page.props

  if (! app) {
    return
  }

  const getSections = () => {
    // the navigation sections
    const sections = []

    // add admin navigation items
    // sections.push({
    //   title: "RankRover.ai",
    //   items: [
    //     { title: "Apps", to: "/apps", icon: <RectangleGroupIcon className="w-4 h-4" /> },
    //   ]
    // })

    // add app navigation items
    app && sections.unshift({
      title: app.name,
      items: [
        { title: "App", to: `/app/${app.slug}`, icon: <HomeIcon className="w-4 h-4" />, exact: true },
        { title: "Content", to: `/app/${app.slug}/content`, icon: <DocumentCheckIcon className="w-4 h-4" /> },
      ]
    })

    return sections
  }

  return (
    <aside className="sticky flex flex-col w-64 border-r bg-gray-950">
      <div className="flex items-center justify-center px-4 py-8">
        <Link href="/app">
          <img
            className="w-24"
            src="http://localhost:8000/images/logo.png"
            alt="logo"
          />
        </Link>
      </div>
      <nav className="flex flex-col">
        {getSections().map((section, i) => (
          <section className="p-3" key={i}>
            <h4 className="px-2 py-0 mb-2 text-xs text-gray-400">
              {section.title}
            </h4>
            <ul className="flex flex-col">
              {section.items.map((item, x) => (
                <li key={x}>
                  <Link
                    className="px-2 py-2.5 mb-1 flex items-center gap-x-1 text-sm rounded-md text-gray-200 hover:bg-primary hover:text-primary-foreground"
                    href={item.to}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
      <footer className="px-4 py-6 mt-auto">
        <Button className="w-full" variant="secondary">
          Contact support 🛎️
        </Button>
      </footer>
    </aside>
  )
}
