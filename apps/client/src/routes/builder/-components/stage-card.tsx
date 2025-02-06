import { TrashIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import RemoveStage from './remove-stage'
import { escapeRoomContract } from '@escape-room/contracts'
import { z } from 'zod'
import { Link } from '@tanstack/react-router'

type StageCardProps = {
  className?: string
  style?: React.CSSProperties
  escapeRoomId: string
  stage: z.infer<(typeof escapeRoomContract.findOneById.responses)['200']>['stages'][number]
}

export default function StageCard({ className, style, stage, escapeRoomId }: StageCardProps) {
  return (
    <div className={cn('w-full border rounded-md', className)} style={style}>
      <div className="flex items-center justify-between px-2 py-1">
        <p>{stage.label}</p>

        <RemoveStage stageId={stage.id}>
          <Button variant="destructive-outline" size="icon-sm" icon={<TrashIcon />} />
        </RemoveStage>
      </div>

      <Link
        className="flex items-center justify-center bg-muted w-full h-32"
        to="/builder/$escapeRoomId/$stageId"
        params={{ escapeRoomId, stageId: stage.id }}
      >
        <img alt={stage.label} src={stage.thumbnail.url} className="size-full object-cover" />
      </Link>
    </div>
  )
}
