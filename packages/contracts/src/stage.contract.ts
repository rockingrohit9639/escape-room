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
  thumbnail: z.object({ id: z.string(), url: z.string() }),
  order: z.number(),
})
export const newStageSchema = stageSchema.omit({ id: true, order: true, thumbnail: true }).extend({
  thumbnail: z.instanceof(File, { message: 'Please upload thumbnail.' }),
})

export const stageContract = client.router(
  {
    new: {
      method: 'POST',
      path: '/:escapeRoomId',
      contentType: 'multipart/form-data',
      pathParams: z.object({ escapeRoomId: z.string() }),
      /**
       * Fortunately, we cannot upload files with application/json
       */
      body: client.type<{ thumbnail: File; stageData: string }>(),
      responses: {
        200: stageSchema,
      },
    },
    remove: {
      method: 'DELETE',
      path: '/:stageId',
      body: z.object({}),
      pathParams: z.object({ stageId: z.string() }),
      responses: {
        200: stageSchema.pick({ id: true }),
      },
    },
    findAllByEscapeRoom: {
      method: 'GET',
      path: '/escape-room/:escapeRoomId',
      pathParams: z.object({ escapeRoomId: z.string() }),
      responses: {
        200: stageSchema.array(),
      },
    },
  },
  { pathPrefix: '/stage' },
)
