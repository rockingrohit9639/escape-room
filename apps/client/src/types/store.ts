import { stageObjectSchema } from '@escape-room/contracts'
import { z } from 'zod'

export type StageObject = z.infer<typeof stageObjectSchema>

export type StageStoreState = {
  objects: StageObject[]
}

export type StageStoreActions = {
  addObject: (type: StageObject['type']) => void
}
