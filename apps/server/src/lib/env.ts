import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(8000),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  DATABASE_URL: z.string(),
  CORS_ORIGIN: z.union([z.string(), z.boolean()]).default(true),
  SESSION_SECRET: z.string().min(1),
  SESSION_COOKIE_MAX_AGE: z.coerce.number(),

  // Storage
  STORAGE_ENDPOINT: z.string(),
  STORAGE_PORT: z.coerce.number(),
  STORAGE_USE_SSL: z.coerce.boolean().default(false),
  STORAGE_ACCESS_KEY: z.string().min(1),
  STORAGE_SECRET_KEY: z.string().min(1),
  STORAGE_REGION: z.string().min(1),

  // Server
  SERVER_URL: z.string().url(),
})

export type Env = z.infer<typeof envSchema>

export function validate(config: Record<string, unknown>) {
  return envSchema.parse(config)
}
