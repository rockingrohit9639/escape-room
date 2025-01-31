import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/builder/$escapeRoomId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/builder/$escapeRoomId"!</div>
}
