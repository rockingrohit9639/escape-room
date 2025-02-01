import { createFileRoute, notFound } from '@tanstack/react-router'
import TopMenu from './-components/top-menu'
import { apiClient } from '~/lib/client'
import ErrorMessage from '~/components/error-message'
import ObjectsSidebar from './-components/objects-sidebar'
import StageSidebar from './-components/stage-sidebar'
import Canvas from './-components/canvas'

export const Route = createFileRoute('/builder/$escapeRoomId')({
  component: EscapeRoomBuilder,
  loader: async ({ params }) => {
    const response = await apiClient.escapeRoom.findOneById.query({ params })

    if (response.status !== 200) {
      throw notFound()
    }

    return response.body
  },
  notFoundComponent: () => <ErrorMessage description="Escape room not found." />,
})

function EscapeRoomBuilder() {
  return (
    <div className="h-[calc(100vh_-_64px)] overflow-hidden w-full mt-16">
      <TopMenu />

      <div className="grid grid-cols-12 w-full h-full">
        <ObjectsSidebar className="border-r h-full col-span-2" />
        <Canvas className="col-span-8" />
        <StageSidebar className="border-l h-full col-span-2" />
      </div>
    </div>
  )
}
