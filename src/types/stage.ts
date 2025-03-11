import type { StageObjectType } from "@prisma/client"
import { type StageObject } from "~/server/api/routers/stage-object/stage-object.schema"

/** @TODO Change data-structure for objects */
export type StageStoreState = {
  objects: StageObject[]
  activeObject: StageObject | undefined
}

export type StageStoreActions = {
  addObject: (type: StageObjectType) => void
  setActiveObject: (stageObject: StageObject | undefined) => void
  updateActiveObject: (stageObject: StageObject) => void
  isActiveObject: (id: string) => boolean
}
