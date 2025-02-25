import { PercentCircleIcon, TimerIcon, UsersIcon } from "lucide-react"
import { type Metadata } from "next"
import StatCard from "~/components/stat-card"
import { ESCAPE_ROOM_DIFFICULTY_MAP, ESCAPE_ROOM_VISIBILITY_MAP } from "~/lib/escape-room"
import { api } from "~/trpc/server"

type EscapeRoomProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: EscapeRoomProps): Promise<Metadata> {
  const { id } = await params
  const escapeRoom = await api.escapeRoom.findById(id)

  return {
    title: escapeRoom.label,
    description: escapeRoom.description,
  }
}

export default async function EscapeRoom({ params }: EscapeRoomProps) {
  const { id } = await params
  const escapeRoom = await api.escapeRoom.findById(id)

  const difficultyColor = ESCAPE_ROOM_DIFFICULTY_MAP[escapeRoom.difficulty].color
  const visibilityColor = ESCAPE_ROOM_VISIBILITY_MAP[escapeRoom.visibility].color

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between gap-4">
        <h1 className="font-heading text-8xl">{escapeRoom.label}</h1>

        <div className="flex gap-2">
          <div
            className="h-max rounded-md border px-2 py-1 text-xs"
            style={{
              borderColor: difficultyColor,
              color: difficultyColor,
            }}
          >
            {escapeRoom.difficulty}
          </div>
          <div
            className="h-max rounded-md border px-2 py-1 text-xs"
            style={{
              borderColor: visibilityColor,
              color: visibilityColor,
            }}
          >
            {escapeRoom.visibility}
          </div>
        </div>
      </div>

      <p className="mb-4 font-secondary text-4xl">{escapeRoom.description}</p>

      <div className="grid w-full grid-cols-3 gap-4 py-4">
        <StatCard icon={UsersIcon} label="Total players" value="40" />
        <StatCard icon={PercentCircleIcon} label="Completion Percentage" value="90" />
        <StatCard icon={TimerIcon} label="Average completion time" value="40" />

        <p className="col-span-3 text-muted-foreground">Stages</p>
      </div>
    </div>
  )
}
