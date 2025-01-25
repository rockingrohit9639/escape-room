import { Outlet, redirect } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { apiClient } from '~/lib/client'
import { CURRENT_USER_QUERY_KEY } from '~/lib/constants'

export const Route = createFileRoute('/_app')({
  component: App,
  loader: async ({ context: { queryClient } }) => {
    const user = await queryClient.ensureQueryData({
      queryKey: CURRENT_USER_QUERY_KEY,
      queryFn: () => apiClient.user.me.query(),
    })

    if (user.status !== 200) {
      throw redirect({ to: '/login' })
    }

    return user
  },
})

function App() {
  return <Outlet />
}
