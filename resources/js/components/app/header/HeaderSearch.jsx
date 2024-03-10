import { MagnifyingGlassIcon } from "@heroicons/react/16/solid"

import { Input } from "@/components/ui/input"

export default function HeaderSearch() {
  return (
    <div className="flex items-center gap-x-2">
      <MagnifyingGlassIcon
        className="w-6 h-6"
      />
      <Input
        type="search"
        placeholder="Search the universe and more..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  )
}
