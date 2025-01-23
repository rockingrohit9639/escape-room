import { z } from 'zod';

const envSchema = z.object({
  PORT: z.number().default(8000),
  DATABASE_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export function validate(config: Record<string, unknown>) {
  return envSchema.parse(config);
}
