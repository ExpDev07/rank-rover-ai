import * as React from "react"
import { router, usePage, Link } from "@inertiajs/react"
import { cn } from "@/lib/utils"

import {
  CaretSortIcon,
  CheckIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function HeaderAppSwitcher({
  className
}) {
  const page = usePage()
  const { current_user_apps: apps, app: selectedApp } = page.props

  const [open, setOpen] = React.useState(false)

  const groups = [
    {
      label: "All",
      apps,
    },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select an app"
          className={cn("w-[200px] justify-between", className)}
        >
          {selectedApp ? (
            <>
              <Avatar className="w-5 h-5 mr-2">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=/${selectedApp.name}`}
                  alt={selectedApp.name}
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              {selectedApp.name}
            </>
          ) : (
            <>
              Select an app
            </>
          )}
          <CaretSortIcon className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandInput
              placeholder="Search apps..."
            />
            <CommandEmpty>
              No apps found.
            </CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.apps.map((app, i) => (
                  <CommandItem
                    className="text-sm"
                    key={i}
                    onSelect={() => {
                      setOpen(false)
                      router.get(`/app/${app.slug}`)
                    }}
                  >
                    <Avatar className="w-5 h-5 mr-2">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=/${app.name}`}
                        alt={app.name}
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {app.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedApp?.name === app.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <Link href="/apps">
                <CommandItem>
                  <HamburgerMenuIcon className="w-5 h-5 mr-2" />
                  Manage apps
                </CommandItem>
              </Link>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
