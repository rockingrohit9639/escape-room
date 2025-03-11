import { z } from "zod"

export const baseObject = z.object({
  id: z.string(),
  label: z.string(),
  position: z.object({ x: z.number(), y: z.number() }),
  rotation: z.number().default(0),
  size: z.object({ width: z.number(), height: z.number() }),
  scale: z.object({ x: z.number(), y: z.number() }).optional(),
  disabled: z.boolean().default(false),
  isDraggable: z.boolean().default(false),
  isDroppable: z.boolean().default(false),
})

export const imageObject = baseObject.extend({
  type: z.literal("IMAGE"),
  data: z.object({ url: z.string().url() }),
})

export const audioObject = baseObject.extend({
  type: z.literal("AUDIO"),
  data: z.object({ url: z.string() }),
})

export const textObject = baseObject.extend({
  type: z.literal("TEXT"),
  data: z.object({
    text: z.string().min(1),
    fontSize: z.number().default(16),
    fill: z.string().startsWith("#").length(7).default("#FFFFFF"),
    align: z.enum(["left", "center", "right"]).default("left"),
  }),
})

export const stageObjectSchema = z.discriminatedUnion("type", [
  imageObject,
  audioObject,
  textObject,
])

export type StageObject = z.infer<typeof stageObjectSchema>
export type ObjectByType<T extends StageObject["type"]> = Extract<StageObject, { type: T }>
