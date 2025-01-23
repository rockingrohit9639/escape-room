import { client } from './lib/client';
import { z } from 'zod';

export const authContract = client.router(
  {
    test: {
      method: 'GET',
      path: '/',
      responses: {
        200: z.object({ success: z.boolean() }),
      },
    },
  },
  { pathPrefix: '/auth' }
);
