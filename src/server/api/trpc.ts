import { getAuth } from "@clerk/nextjs/server"
import { initTRPC, TRPCError } from "@trpc/server"
import { type NextRequest } from "next/server"
import superjson from "superjson"
import { ZodError } from "zod"

import { db } from "~/server/db"

export const createTRPCContext = async ({
  req,
  ...opts
}: {
  headers: Headers
  req: NextRequest
}) => {
  return {
    db,
    auth: getAuth(req),
    ...opts,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createCallerFactory = t.createCallerFactory

export const createTRPCRouter = t.router

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now()

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100
    await new Promise((resolve) => setTimeout(resolve, waitMs))
  }

  const result = await next()

  const end = Date.now()
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`)

  return result
})

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware)

/**
 * This middleware will make sure that the user is authenticated with clerk.
 */
const isAuthenticated = t.middleware(async ({ next, ctx }) => {
  if (!ctx.auth?.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User is not authenticated.",
    })
  }

  const user = await db.user.findUnique({
    where: { clerkId: ctx.auth.userId },
    select: { id: true },
  })
  if (!user) {
    throw new TRPCError({ code: "NOT_FOUND", message: "User with clerk id not found." })
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth,
      userId: user.id,
    },
  })
})

export const protectedProcedure = t.procedure.use(timingMiddleware).use(isAuthenticated)
