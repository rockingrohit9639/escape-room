import { PlusIcon } from "lucide-react"
import Link from "next/link"

export default function EscapeRooms() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4 lg:grid-cols-6">
      <Link
        href="/dashboard/escape-rooms/new"
        className="hover:bg-sidebar col-span-2 flex h-auto flex-col items-center justify-center gap-2 rounded-md border border-dashed p-4"
      >
        <PlusIcon />
        <p>Create new escape room</p>
      </Link>
    </div>
  )
}
