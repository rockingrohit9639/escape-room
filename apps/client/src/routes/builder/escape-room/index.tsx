import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'

export const Route = createFileRoute('/builder/escape-room/')({
  component: Rooms,
})

function Rooms() {
  return (
    <div className="p-4 grid grid-cols-8 gap-4">
      <Link
        to="/builder/escape-room/new"
        className="col-span-2 h-16 border rounded-md p-4 flex items-center gap-2 border-dashed hover:bg-sidebar"
      >
        <PlusIcon />
        <p>Create new escape room</p>
      </Link>
    </div>
  )
}
