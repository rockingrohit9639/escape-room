"use client"

import { useParams, useRouter } from "next/navigation"
import ErrorMessage from "~/components/error-message"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"

type StageSelectorProps = {
  className?: string
  style?: React.CSSProperties
  escapeRoomId: string
}

export default function StageSelector({ className, style, escapeRoomId }: StageSelectorProps) {
  const { isPending, data, error } = api.stage.findAll.useQuery(escapeRoomId)
  const { stageId } = useParams<{ stageId: string }>()
  const router = useRouter()

  if (error) {
    return <ErrorMessage description={error.message} />
  }

  return (
    <Select
      disabled={isPending}
      value={stageId}
      onValueChange={(value) => {
        router.push(`/builder/${escapeRoomId}/${value}`)
      }}
    >
      <SelectTrigger className={cn("w-80", className)} style={style}>
        <SelectValue placeholder="Select stage" />
      </SelectTrigger>

      <SelectContent>
        {data?.map((stage) => (
          <SelectItem key={stage.id} value={stage.id}>
            {stage.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
