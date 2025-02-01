import { stageContract } from '@escape-room/contracts'
import { NestRequestShapes, NestResponseShapes } from '@ts-rest/nest'

export type StageRequestShapes = NestRequestShapes<typeof stageContract>
export type StageResponseShapes = NestResponseShapes<typeof stageContract>
