import { client } from './lib/client'
import { z } from 'zod'
import { userSchema } from './user.contract'

export const authContract = client.router(
  {
    login: {
      method: 'POST',
      path: '/login',
      body: userSchema.pick({ email: true, password: true }),
      responses: {
        200: z.object({ success: z.boolean() }),
      },
    },
    signup: {
      method: 'POST',
      path: '/signup',
      body: userSchema.pick({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
      }),
      responses: {
        201: z.object({ user: userSchema.omit({ password: true }) }),
      },
    },
  },
  { pathPrefix: '/auth' },
)
