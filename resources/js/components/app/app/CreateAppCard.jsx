import { PlusIcon } from '@radix-ui/react-icons'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import CreateAppDialog from '@/components/app/app/CreateAppDialog'

export default function CreateAppCard() {
  return (
    <CreateAppDialog>
      <Card className="relative p-4 hover:ring hover:ring-primary hover:cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center h-full gap-2 p-0">
          <PlusIcon
            className="w-16 h-16 text-gray-950"
          />
          <h4 className="text-lg text-muted-foreground">
            Create app
          </h4>
        </CardContent>
      </Card>
    </CreateAppDialog>
  )
}
