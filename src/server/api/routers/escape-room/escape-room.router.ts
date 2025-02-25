import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../../trpc"
import { escapeRoomSchema } from "./escape-room.schema"
import { createNewEscapeRoom, findAllEscapeRooms, findEscapeRoomById } from "./escape-room.service"

export const escapeRoomRouter = createTRPCRouter({
  new: protectedProcedure
    .input(escapeRoomSchema)
    .mutation(({ input, ctx }) => createNewEscapeRoom(input, ctx.userId, ctx.db)),
  findAll: protectedProcedure.query(({ ctx }) => findAllEscapeRooms(ctx.userId, ctx.db)),
  findById: protectedProcedure
    .input(z.string())
    .query(({ input, ctx }) => findEscapeRoomById(input, ctx.userId, ctx.db)),
})
