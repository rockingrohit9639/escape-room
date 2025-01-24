import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, 'First name is required.').max(255),
  lastName: z.string().min(1, 'Last name is required.').max(255),
  email: z.string().email().toLowerCase().trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(255)
    .trim(),
});
