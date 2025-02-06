import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/builder/$escapeRoomId/$stageId')({
  component: StageEditor,
})

function StageEditor() {
  return <div className="h-screen overflow-hidden w-full">Stage Editor</div>
}
