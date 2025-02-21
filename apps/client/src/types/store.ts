import { stageObjectSchema } from '@escape-room/contracts'
import { z } from 'zod'

export type StageObject = z.infer<typeof stageObjectSchema>

export type StageStoreState = {
  objects: StageObject[]
  activeObject: StageObject | undefined
}

/** @todo improve efficiency of setter functions (probably change the data structure) */
export type StageStoreActions = {
  addObject: (type: StageObject['type']) => void
  setActiveObject: (object: StageObject) => void
  updateObject: (object: StageObject) => void
}
