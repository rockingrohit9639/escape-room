import { type Metadata } from "next"
import { api } from "~/trpc/server"
import StageSelector from "./_components/stage-selector"

type BuilderProps = {
  params: Promise<{ escapeRoomId: string; stageId: string }>
}

export async function generateMetadata({ params }: BuilderProps): Promise<Metadata> {
  const { stageId } = await params
  const stage = await api.stage.findById(stageId)

  return {
    title: stage.label,
    description: stage.description,
  }
}

export default async function Builder({ params }: BuilderProps) {
  const { escapeRoomId } = await params

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-2">
        <StageSelector escapeRoomId={escapeRoomId} />
      </div>
    </div>
  )
}
