import { z } from 'zod'
import { client } from './lib/client'

const stageBackgroundSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('IMAGE'),
    url: z.string(),
  }),
  z.object({
    type: z.literal('VIDEO'),
    url: z.string(),
  }),
  z.object({
    type: z.literal('COLOR'),
    color: z.string().startsWith('#').length(7),
  }),
])

export const stageSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Label is required.'),
  description: z.string().min(10, 'Please describe the stage.'),
  background: stageBackgroundSchema,
  timeLimit: z.number().int().min(10),
  order: z.number(),
})

export const stageContract = client.router(
  {
    new: {
      method: 'POST',
      path: '/:escapeRoomId',
      pathParams: z.object({ escapeRoomId: z.string() }),
      body: stageSchema.omit({ id: true, order: true }),
      responses: {
        200: stageSchema,
      },
    },
  },
  { pathPrefix: '/stage' },
)
