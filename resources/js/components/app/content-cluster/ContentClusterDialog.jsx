import * as React from "react"
import { router, usePage, Link } from "@inertiajs/react"
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function ContentClusterDialog({
  contentCluster,
  children,
  ...props
}) {
  // setTimeout(() => {
  //   router.reload({ only: ['content', 'content_cluster'], preserveState: true })
  // }, 5000)

  const page = usePage()
  const { app } = page.props

  const handleWriteContent = (content) => {
    router.post(`/app/${app.slug}/content/${content.slug}/write`, {});
  }

  return (
    <Dialog {...props}>
      <DialogContent className="w-full max-w-7xl">
        <DialogHeader>
          <DialogTitle>
            Create content 🚀
          </DialogTitle>
          <DialogDescription>
            We recommended some content for you!
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Keywords</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentCluster.contents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell className="py-3 pr-4">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${content.title}`}
                        alt={content.title}
                      />
                      <AvatarFallback>
                        {content.title}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="py-3 pr-4 font-medium">
                    {!content.current_revision ? content.title : (
                      <Link className="text-primary" href={`/app/${app.slug}/content/${content.slug}`}>
                        {content.title}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell className="flex flex-wrap gap-2 py-4 pr-4">
                    {content.keywords.map((keyword, i) => (
                      <Badge key={i} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center py-3">
                      {(!content.content_queued && !content.current_revision) && (
                        <Button size="sm" onClick={() => handleWriteContent(content)}>Write now</Button>
                      )}
                      {(content.content_queued || content.current_revision?.status === 'generating') && (
                        <ArrowPathIcon className="w-5 h-5 animate-spin text-muted-foreground" />
                      )}
                      {(!content.content_queued && content.current_revision && content.current_revision.status === 'generated') && (
                        <Badge variant="success">Ready</Badge>
                      )}
                      {(!content.content_queued && content.current_revision && content.current_revision.status === 'errored') && (
                        <Badge variant="destructive">Error</Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <DialogClose asChild>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
