import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { env } from '~/lib/env'
import { Toaster } from '~/components/ui/sonner'
import { queryClient } from '~/lib/client'
import { ThemeProvider } from '~/components/theme-provider'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Root,
})

function Root() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="escape-room-theme">
          <Outlet />
        </ThemeProvider>
        <Toaster richColors />
      </QueryClientProvider>
      {env.VITE_SHOW_DEV_TOOLS ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </>
  )
}
