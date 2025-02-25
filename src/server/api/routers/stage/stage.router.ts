import { createTRPCRouter, protectedProcedure } from "../../trpc"
import { createStageSchema } from "./stage.schema"
import { createStage } from "./stage.service"

export const stageRouter = createTRPCRouter({
  new: protectedProcedure
    .input(createStageSchema)
    .mutation(({ input, ctx }) => createStage(input, ctx.userId, ctx.db)),
})
