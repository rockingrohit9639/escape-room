import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc"
import { escapeRoomRouter } from "./routers/escape-room/escape-room.router"

export const appRouter = createTRPCRouter({
  escapeRoom: escapeRoomRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
