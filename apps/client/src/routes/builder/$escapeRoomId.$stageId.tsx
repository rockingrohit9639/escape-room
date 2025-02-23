import { createFileRoute, useNavigate } from '@tanstack/react-router'
import StageSelector from './-components/stage-selector'
import CreateNewStage from './-components/create-new-stage'
import { Button } from '~/components/ui/button'
import { PlusIcon } from 'lucide-react'
import StageObjectsSidebar from './-components/stage-objects-sidebar'
import ObjectPropertiesSidebar from './-components/object-properties-sidebar'
import Canvas from './-components/canvas'
import Toolbar from './-components/toolbar'

export const Route = createFileRoute('/builder/$escapeRoomId/$stageId')({
  component: StageEditor,
})

function StageEditor() {
  const { escapeRoomId, stageId } = Route.useParams()
  const navigate = useNavigate()

  return (
    <div className="relative h-screen overflow-hidden w-full">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <StageSelector
          escapeRoomId={escapeRoomId}
          value={stageId}
          onChange={(value) => {
            navigate({
              to: '/builder/$escapeRoomId/$stageId',
              params: {
                escapeRoomId,
                stageId: value,
              },
            })
          }}
        />

        <CreateNewStage escapeRoomId={escapeRoomId}>
          <Button icon={<PlusIcon />} variant="secondary" />
        </CreateNewStage>
      </div>

      <StageObjectsSidebar />
      <Canvas />
      <ObjectPropertiesSidebar />
      <Toolbar />
    </div>
  )
}
