import { useLoaderData } from '@tanstack/react-router'
import { Edit2Icon, GalleryThumbnailsIcon, TrashIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import RemoveStage from './remove-stage'

type StageGridProps = {
  className?: string
  style?: React.CSSProperties
}

export default function StageGrid({ className, style }: StageGridProps) {
  const { stages } = useLoaderData({ from: '/builder/$escapeRoomId' })

  return (
    <div className={cn('flex flex-col gap-4', className)} style={style}>
      {stages.map((stage) => (
        <div key={stage.id} className="w-full border rounded-md">
          <div className="flex items-center justify-between px-2 py-1">
            <p>{stage.label}</p>

            <div className="flex items-center gap-2">
              <Button className="text-muted-foreground" variant="ghost" size="icon-sm" icon={<Edit2Icon />} />
              <RemoveStage stageId={stage.id}>
                <Button variant="destructive-outline" size="icon-sm" icon={<TrashIcon />} />
              </RemoveStage>
            </div>
          </div>

          <div className="flex items-center justify-center bg-muted w-full h-32">
            <GalleryThumbnailsIcon className="size-5 text-muted-foreground" />
          </div>
        </div>
      ))}
    </div>
  )
}
