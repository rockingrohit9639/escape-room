import { RoomDifficulty, RoomVisibility } from "@prisma/client"
import { z } from "zod"

const baseEscapeRoom = z.object({
  label: z.string().min(1, "Please enter your escape room name."),
  description: z.string().min(10, "Please describe your escape room."),
  difficulty: z.nativeEnum(RoomDifficulty),
  tags: z.array(z.string()), // e.g. horror, adventure etc
})

export const escapeRoomSchema = z.discriminatedUnion("visibility", [
  baseEscapeRoom.extend({
    visibility: z.literal(RoomVisibility.PRIVATE),
    password: z.string().min(6, "Please enter at least 6 characters."), // allow access to private rooms with a password
  }),
  baseEscapeRoom.extend({
    visibility: z.literal(RoomVisibility.PUBLIC),
  }),
])
export type EscapeRoomSchema = z.infer<typeof escapeRoomSchema>
