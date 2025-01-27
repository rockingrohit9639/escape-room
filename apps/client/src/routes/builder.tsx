import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { apiClient } from '~/lib/client'
import { CURRENT_USER_QUERY_KEY } from '~/lib/constants'

export const Route = createFileRoute('/builder')({
  component: BuilderLayout,
  loader: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      queryKey: CURRENT_USER_QUERY_KEY,
      queryFn: () => apiClient.user.me.query(),
    })

    if (user.status !== 200) {
      throw redirect({ to: '/login' })
    }
  },
})

function BuilderLayout() {
  return (
    <div>
      this is layout
      <Outlet />
    </div>
  )
}
