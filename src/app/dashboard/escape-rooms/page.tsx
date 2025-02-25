"use client"

import { PencilIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import { api } from "~/trpc/react"
import { match } from "ts-pattern"
import { Skeleton } from "~/components/ui/skeleton"
import ErrorMessage from "~/components/error-message"
import { ESCAPE_ROOM_DIFFICULTY_MAP, ESCAPE_ROOM_VISIBILITY_MAP } from "~/lib/escape-room"
import { Button } from "~/components/ui/button"

export default function EscapeRooms() {
  const escapeRoomsQuery = api.escapeRoom.findAll.useQuery()

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4 lg:grid-cols-6">
      <Link
        href="/dashboard/escape-rooms/new"
        className="col-span-2 flex h-auto flex-col items-center justify-center gap-2 rounded-md border border-dashed p-4 hover:bg-sidebar"
      >
        <PlusIcon />
        <p>Create new escape room</p>
      </Link>

      {match(escapeRoomsQuery)
        .with({ status: "pending" }, () =>
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="col-span-2 h-28 w-full" />
          )),
        )
        .with({ status: "error" }, ({ error }) => <ErrorMessage description={error.message} />)
        .with({ status: "success" }, ({ data }) =>
          data.map((escapeRoom) => {
            const difficultyColor = ESCAPE_ROOM_DIFFICULTY_MAP[escapeRoom.difficulty].color
            const visibilityColor = ESCAPE_ROOM_VISIBILITY_MAP[escapeRoom.visibility].color

            return (
              <div key={escapeRoom.id} className="col-span-2 rounded-md border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="truncate">{escapeRoom.label}</h2>

                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-md border px-2 py-1 text-xs"
                      style={{
                        borderColor: difficultyColor,
                        color: difficultyColor,
                      }}
                    >
                      {escapeRoom.difficulty}
                    </div>
                    <div
                      className="rounded-md border px-2 py-1 text-xs"
                      style={{
                        borderColor: visibilityColor,
                        color: visibilityColor,
                      }}
                    >
                      {escapeRoom.visibility}
                    </div>
                  </div>
                </div>
                <p className="mb-4 text-muted-foreground">{escapeRoom.description}</p>

                <Link href={`/dashboard/escape-rooms/${escapeRoom.id}`}>
                  <Button icon={<PencilIcon />}>Edit</Button>
                </Link>
              </div>
            )
          }),
        )
        .exhaustive()}
    </div>
  )
}
