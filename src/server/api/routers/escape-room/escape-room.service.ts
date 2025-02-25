import { type PrismaClient } from "@prisma/client"
import { type EscapeRoomSchema } from "./escape-room.schema"
import { omit } from "radash"
import { TRPCError } from "@trpc/server"

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

export async function findAllEscapeRooms(userId: string, db: PrismaClient) {
  return db.escapeRoom.findMany({ where: { createdById: userId } })
}

export async function findEscapeRoomById(escapeRoomId: string, userId: string, db: PrismaClient) {
  const escapeRoom = await db.escapeRoom.findUnique({
    where: { id: escapeRoomId, createdById: userId },
  })
  if (!escapeRoom) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Escape room not found.",
    })
  }

  return escapeRoom
}
