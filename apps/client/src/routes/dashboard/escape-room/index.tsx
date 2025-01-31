import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { PencilIcon, PlusIcon } from 'lucide-react'
import { match } from 'ts-pattern'
import ErrorMessage from '~/components/error-message'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'

import { apiClient } from '~/lib/client'
import { getErrorMessage } from '~/lib/error'
import { ESCAPE_ROOM_DIFFICULTY_MAP, ESCAPE_ROOM_VISIBILITY_MAP } from '~/lib/escape-room'

export const Route = createFileRoute('/dashboard/escape-room/')({
  component: Rooms,
})

function Rooms() {
  const escapeRoomsQuery = apiClient.escapeRoom.findAll.useQuery(['escape-rooms'])

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <Link
        to="/dashboard/escape-room/new"
        className="col-span-2 h-auto border rounded-md p-4 flex items-center gap-2 border-dashed hover:bg-sidebar flex-col justify-center"
      >
        <PlusIcon />
        <p>Create new escape room</p>
      </Link>

      {match(escapeRoomsQuery)
        .with({ status: 'pending' }, () =>
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16 w-full col-span-2" />),
        )
        .with({ status: 'error' }, ({ error }) => <ErrorMessage description={getErrorMessage(error)} />)
        .with({ status: 'success' }, ({ data: { body } }) =>
          body.map((escapeRoom) => {
            const difficultyColor = ESCAPE_ROOM_DIFFICULTY_MAP[escapeRoom.difficulty].color
            const visibilityColor = ESCAPE_ROOM_VISIBILITY_MAP[escapeRoom.visibility].color

            return (
              <div key={escapeRoom.id} className="col-span-2 p-4 rounded-md border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="truncate">{escapeRoom.label}</h2>

                  <div className="flex items-center gap-2">
                    <div
                      className="border text-xs rounded-md px-2 py-1"
                      style={{
                        borderColor: difficultyColor,
                        color: difficultyColor,
                      }}
                    >
                      {escapeRoom.difficulty}
                    </div>
                    <div
                      className="border text-xs rounded-md px-2 py-1"
                      style={{
                        borderColor: visibilityColor,
                        color: visibilityColor,
                      }}
                    >
                      {escapeRoom.visibility}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{escapeRoom.description}</p>

                <Link to="/dashboard">
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
