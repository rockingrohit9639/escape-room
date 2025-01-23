import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { env } from '~/lib/env';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: Root,
  }
);

function Root() {
  return (
    <>
      <Outlet />
      {env.VITE_SHOW_DEV_TOOLS ? (
        <TanStackRouterDevtools position="bottom-right" />
      ) : null}
    </>
  );
}
