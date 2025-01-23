import { z } from 'zod';

const envSchema = z.object({
  PORT: z.number().default(8000),
});

export type Env = z.infer<typeof envSchema>;

export function validate(config: Record<string, unknown>) {
  return envSchema.parse(config);
}
