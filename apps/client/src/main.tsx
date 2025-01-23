import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';
import {
  createRouter,
  invariant,
  RouterProvider,
} from '@tanstack/react-router';
import { queryClient } from './lib/client';

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPendingMs: 500,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
invariant(rootElement, "Couldn't find root element");

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
