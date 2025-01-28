import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/builder/rooms/')({
  component: Rooms,
})

function Rooms() {
  return <div className="p-4">Hello "/builder/rooms/"!</div>
}
