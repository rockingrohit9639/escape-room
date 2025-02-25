import { z } from "zod"

export const stageBackgroundSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("IMAGE"),
    url: z.string(),
  }),
  z.object({
    type: z.literal("VIDEO"),
    url: z.string(),
  }),
  z.object({
    type: z.literal("COLOR"),
    color: z.string().startsWith("#").length(7),
  }),
])

/** @TODO Add thumbnail */
export const createStageSchema = z.object({
  escapeRoomId: z.string().min(1),
  label: z.string().min(1, "Label is required."),
  description: z.string().min(10, "Please describe the stage."),
  background: stageBackgroundSchema,
  timeLimit: z.number().int().min(10),
})

export type CreateStageSchema = z.infer<typeof createStageSchema>
