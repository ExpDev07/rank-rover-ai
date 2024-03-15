import { PlusIcon } from '@radix-ui/react-icons'
import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import CreateContentDialog from '@/components/app/content/CreateContentDialog'

export default function CreateContentCard({
  className,
}) {
  return (
    <CreateContentDialog>
      <Card className={cn('relative p-4 hover:ring hover:ring-primary hover:cursor-pointer', className)}>
        <CardContent className="flex flex-col items-center justify-center h-full gap-2 p-0">
          <PlusIcon
            className="w-16 h-16 text-gray-950"
          />
          <h4 className="text-lg text-muted-foreground">
            Create content
          </h4>
        </CardContent>
      </Card>
    </CreateContentDialog>
  )
}
