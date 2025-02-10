import { createFileRoute, notFound } from '@tanstack/react-router'
import { apiClient } from '~/lib/client'
import ErrorMessage from '~/components/error-message'
import StatCard from '~/components/stat-card'
import { PercentCircleIcon, PlusIcon, TimerIcon, UsersIcon } from 'lucide-react'
import StageCard from './-components/stage-card'
import CreateNewStage from './-components/create-new-stage'
import { ESCAPE_ROOM_DIFFICULTY_MAP, ESCAPE_ROOM_VISIBILITY_MAP } from '~/lib/escape-room'

export const Route = createFileRoute('/builder/$escapeRoomId/')({
  component: EscapeRoomBuilder,
  loader: async ({ params }) => {
    const response = await apiClient.escapeRoom.findOneById.query({ params })

    if (response.status !== 200) {
      throw notFound()
    }

    return response.body
  },
  notFoundComponent: () => <ErrorMessage description="Escape room not found." />,
})

function EscapeRoomBuilder() {
  const { id, label, description, difficulty, visibility, stages } = Route.useLoaderData()

  const difficultyColor = ESCAPE_ROOM_DIFFICULTY_MAP[difficulty].color
  const visibilityColor = ESCAPE_ROOM_VISIBILITY_MAP[visibility].color

  return (
    <div className="w-full mx-auto max-w-screen-lg border-x min-h-screen p-4">
      <nav className="flex justify-between gap-4 mb-4">
        <h1 className="text-8xl">{label}</h1>

        <div className="flex gap-2">
          <div
            className="border text-xs rounded-md px-2 py-1 h-max"
            style={{
              borderColor: difficultyColor,
              color: difficultyColor,
            }}
          >
            {difficulty}
          </div>
          <div
            className="border text-xs rounded-md px-2 py-1 h-max"
            style={{
              borderColor: visibilityColor,
              color: visibilityColor,
            }}
          >
            {visibility}
          </div>
        </div>
      </nav>

      <p className="font-secondary text-4xl mb-4">{description}</p>

      <div className="w-full max-w-screen-lg mx-auto py-4 grid grid-cols-3 gap-4">
        <StatCard icon={UsersIcon} label="Total players" value="40" />
        <StatCard icon={PercentCircleIcon} label="Completion Percentage" value="90" />
        <StatCard icon={TimerIcon} label="Average completion time" value="40" />

        <p className="text-muted-foreground col-span-3">Stages</p>

        <CreateNewStage escapeRoomId={id}>
          <button className="min-h-40 size-full border border-dashed flex items-center justify-center flex-col gap-2 rounded-md hover:bg-accent">
            <PlusIcon />
            <p>Add new stage</p>
          </button>
        </CreateNewStage>

        {stages.map((stage) => (
          <StageCard key={stage.id} stage={stage} escapeRoomId={id} />
        ))}
      </div>
    </div>
  )
}
