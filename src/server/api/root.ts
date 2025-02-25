import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc"
import { escapeRoomRouter } from "./routers/escape-room/escape-room.router"
import { stageRouter } from "./routers/stage/stage.router"

export const appRouter = createTRPCRouter({
  escapeRoom: escapeRoomRouter,
  stage: stageRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
