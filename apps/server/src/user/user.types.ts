import { userContract } from '@escape-room/contracts'
import { NestRequestShapes, NestResponseShapes } from '@ts-rest/nest'

export type UserRequestShapes = NestRequestShapes<typeof userContract>
export type UserResponseShapes = NestResponseShapes<typeof userContract>
