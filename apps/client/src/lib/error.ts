import { toast } from 'sonner'
import { z } from 'zod'

const errorSchema = z.object({
  body: z.object({
    error: z.string(),
  }),
})

export function getErrorMessage(error: unknown) {
  const validatedError = errorSchema.safeParse(error)

  return validatedError.success ? validatedError.data.body.error : 'Something went wrong!'
}

export function handleError(error: unknown) {
  toast.error(getErrorMessage(error))
}
