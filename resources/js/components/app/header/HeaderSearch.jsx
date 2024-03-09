import { Input } from "@/components/ui/input"

export default function HeaderSearch() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search the universe and more..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  )
}
