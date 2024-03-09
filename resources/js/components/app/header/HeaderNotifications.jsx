import { BellIcon } from "@radix-ui/react-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

const notifications = [
  {
    id: "abc",
    title: "Access to portal was revoked from test@example.org!",
    date: "just now",
    read: false,
  },
  {
    id: "def",
    title: "We completed processing 18 invoices for you!",
    date: "2 hours ago",
    read: false,
  },
  {
    id: "ghi",
    title: "An invitation was sent to marius@propell.ai to join!",
    date: "4 hours ago",
    read: false,
  },
]

export default function HeaderNotifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="relative rounded-full" size="icon" variant="secondary">
          <BellIcon className="w-6 h-6" />
          <Badge className="absolute top-0 right-0 text-xs transform translate-x-1/2 -translate-y-1/2">
            3
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="border-b">
            <CardTitle>
              Notifications
            </CardTitle>
            <CardDescription>
              You have {notifications.filter(n => !n.read).length} unread messages.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-x-4">
                <span className="block w-2 h-2 translate-y-2 rounded-full bg-primary" />
                <div className="flex flex-col flex-1 gap-1">
                  <p className="text-xs">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.date}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
