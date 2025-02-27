import type { StageObjectType } from "@prisma/client"
import { type StageObject } from "~/server/api/routers/stage-object/stage-object.schema"

export type StageStoreState = {
  objects: StageObject[]
}

export type StageStoreActions = {
  addObject: (type: StageObjectType) => void
}
