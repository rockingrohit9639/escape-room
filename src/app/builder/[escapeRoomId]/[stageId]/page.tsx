import { type Metadata } from "next"
import { api } from "~/trpc/server"
import StageSelector from "./_components/stage-selector"
import RemoveStage from "./_components/remove-stage"
import ObjectsSidebar from "./_components/objects-sidebar"
import ObjectPropertiesSidebar from "./_components/object-properties-sidebar/object-properties-sidebar"

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
  const { escapeRoomId, stageId } = await params
  const stage = await api.stage.findById(stageId)

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-2">
        <StageSelector escapeRoomId={escapeRoomId} />
        <RemoveStage stageId={stageId} />
      </div>

      <ObjectsSidebar stage={stage.label} escapeRoom={stage.escapeRoom.label} />
      <ObjectPropertiesSidebar />
    </div>
  )
}
