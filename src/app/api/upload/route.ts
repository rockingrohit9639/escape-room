import { createRouteHandler } from "uploadthing/next"
import { fileRouter } from "~/uploadthing/file-router"

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
})
