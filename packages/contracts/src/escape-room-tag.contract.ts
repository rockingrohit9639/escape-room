import { z } from 'zod'
import { client } from './lib/client'

export const escapeRoomTagSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const escapeRoomTagContract = client.router(
  {
    findAll: {
      method: 'GET',
      path: '/',
      query: z.object({
        query: z.string().optional(),
      }),
      responses: {
        200: escapeRoomTagSchema.array(),
      },
    },
  },
  { pathPrefix: '/escape-room-tags' },
)
