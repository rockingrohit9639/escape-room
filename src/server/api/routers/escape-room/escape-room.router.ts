import { createTRPCRouter, protectedProcedure } from "../../trpc"
import { escapeRoomSchema } from "./escape-room.schema"
import { createNewEscapeRoom } from "./escape-room.service"

export const escapeRoomRouter = createTRPCRouter({
  new: protectedProcedure
    .input(escapeRoomSchema)
    .mutation(({ input, ctx }) => createNewEscapeRoom(input, ctx.userId, ctx.db)),
})
