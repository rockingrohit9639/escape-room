import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { apiClient } from '~/lib/client'
import { cn } from '~/lib/utils'

type StageSelectorProps = {
  className?: string
  style?: React.CSSProperties
  escapeRoomId: string
  value?: string
  onChange?: (value: string) => void
}

export default function StageSelector({ className, style, escapeRoomId, value, onChange }: StageSelectorProps) {
  const { isPending, data } = apiClient.stage.findAllByEscapeRoom.useQuery(['stages', escapeRoomId], {
    params: { escapeRoomId },
  })

  return (
    <Select disabled={isPending} value={value} onValueChange={onChange}>
      <SelectTrigger className={cn('w-80', className)} style={style}>
        <SelectValue placeholder="Select stage" />
      </SelectTrigger>

      <SelectContent>
        {data?.body.map((stage) => (
          <SelectItem key={stage.id} value={stage.id}>
            {stage.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
