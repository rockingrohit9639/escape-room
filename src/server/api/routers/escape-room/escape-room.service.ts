import { type PrismaClient } from "@prisma/client"
import { type EscapeRoomSchema } from "./escape-room.schema"
import { omit } from "radash"

export async function createNewEscapeRoom(
  body: EscapeRoomSchema,
  userId: string,
  db: PrismaClient,
) {
  return db.escapeRoom.create({
    data: {
      ...omit(body, ["tags"]),
      label: body.label,
      description: body.description,
      difficulty: body.difficulty,
      visibility: body.visibility,
      createdById: userId,
    },
  })
}
