import { z } from 'zod'
import { client } from './lib/client'

const baseEscapeRoom = z.object({
  label: z.string().min(1, 'Please enter your escape room name.'),
  description: z.string().min(10, 'Please describe your escape room.'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  tags: z.array(z.string()), // e.g. horror, adventure etc
})

const roomSchema = z.discriminatedUnion('visibility', [
  baseEscapeRoom.extend({
    visibility: z.literal('PRIVATE'),
    password: z.string().min(6, 'Please enter at least 6 characters.'), // allow access to private rooms with a password
  }),
  baseEscapeRoom.extend({
    visibility: z.literal('PUBLIC'),
  }),
])

export const escapeRoomSchema = roomSchema.and(
  z.object({
    id: z.string(),
    status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'), // allow no further changes if published
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
)

export const escapeRoomContract = client.router(
  {
    new: {
      method: 'POST',
      path: '/',
      body: roomSchema,
      responses: {
        201: z.object({ id: z.string() }),
      },
    },
  },
  { pathPrefix: '/escape-room' },
)
