import type { StageObjectType, StageObject } from "@prisma/client"

export type RawStageObject = Omit<StageObject, "createdAt" | "updatedAt">

export type StageStoreState = {
  objects: RawStageObject[]
}

export type StageStoreActions = {
  addObject: (type: StageObjectType) => void
}
