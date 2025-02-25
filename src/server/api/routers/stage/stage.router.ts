import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../../trpc"
import { createStageSchema } from "./stage.schema"
import { createStage, findAllEscapeRoomStages, findStageById } from "./stage.service"

export const stageRouter = createTRPCRouter({
  new: protectedProcedure
    .input(createStageSchema)
    .mutation(({ input, ctx }) => createStage(input, ctx.userId, ctx.db)),
  findAll: protectedProcedure
    .input(z.string())
    .query(({ input, ctx }) => findAllEscapeRoomStages(input, ctx.userId, ctx.db)),
  findById: protectedProcedure
    .input(z.string())
    .query(({ input, ctx }) => findStageById(input, ctx.userId, ctx.db)),
})
