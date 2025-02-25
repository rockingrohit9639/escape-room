import { type PrismaClient } from "@prisma/client"
import { type CreateStageSchema } from "./stage.schema"
import { TRPCError } from "@trpc/server"

export async function createStage(input: CreateStageSchema, userId: string, db: PrismaClient) {
  const escapeRoom = await db.escapeRoom.findUnique({
    where: { id: input.escapeRoomId },
    select: { createdById: true },
  })

  if (!escapeRoom) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Escape room not found.",
    })
  }

  if (escapeRoom.createdById !== userId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You are not allowed to add stage in this escape room.",
    })
  }

  const stage = await db.stage.create({
    data: {
      label: input.label,
      description: input.description,
      background: input.background,
      order: 0,
      timeLimit: input.timeLimit,
      createdById: userId,
      escapeRoomId: input.escapeRoomId,
    },
  })

  return stage
}

export async function findAllEscapeRoomStages(
  escapeRoomId: string,
  userId: string,
  db: PrismaClient,
) {
  return db.stage.findMany({
    where: { escapeRoomId, createdById: userId },
  })
}
