import { z } from 'zod'
import { client } from './lib/client'

export const fileSchema = z.object({
  id: z.string(),
  mimeType: z.string(),
  bucket: z.string(),
  filename: z.string(),
  url: z.string().url(),
})

export const fileContract = client.router(
  {
    uploadFile: {
      method: 'POST',
      path: '/',
      contentType: 'multipart/form-data',
      body: client.type<{ file: File }>(),
      responses: {
        201: fileSchema,
      },
    },
  },
  { pathPrefix: '/file' },
)
