import { z } from 'zod'
import { client } from './lib/client'

export const ESCAPE_ROOM_DIFFICULTY = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
} as const

const difficultySchema = z.nativeEnum(ESCAPE_ROOM_DIFFICULTY)

export const ESCAPE_ROOM_VISIBILITY = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
} as const

const visibilitySchema = z.nativeEnum(ESCAPE_ROOM_VISIBILITY)

const baseEscapeRoom = z.object({
  label: z.string().min(1, 'Please enter your escape room name.'),
  description: z.string().min(10, 'Please describe your escape room.'),
  difficulty: difficultySchema,
  tags: z.array(z.string()), // e.g. horror, adventure etc
})

const roomSchema = z.discriminatedUnion('visibility', [
  baseEscapeRoom.extend({
    visibility: z.literal(ESCAPE_ROOM_VISIBILITY.PRIVATE),
    password: z.string().min(6, 'Please enter at least 6 characters.'), // allow access to private rooms with a password
  }),
  baseEscapeRoom.extend({
    visibility: z.literal(ESCAPE_ROOM_VISIBILITY.PUBLIC),
  }),
])

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
    findAll: {
      method: 'GET',
      path: '/',
      responses: {
        200: z
          .object({
            id: z.string(),
            label: z.string(),
            description: z.string(),
            difficulty: difficultySchema,
            visibility: visibilitySchema,
            createdAt: z.coerce.date(),
          })
          .array(),
      },
    },
    findOneById: {
      method: 'GET',
      path: '/:escapeRoomId',
      pathParams: z.object({ escapeRoomId: z.string() }),
      responses: {
        200: z.object({
          id: z.string(),
          label: z.string(),
          description: z.string(),
          difficulty: difficultySchema,
          visibility: visibilitySchema,
          createdAt: z.coerce.date(),
        }),
      },
    },
  },
  { pathPrefix: '/escape-room' },
)
