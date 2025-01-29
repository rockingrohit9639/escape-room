import { escapeRoomContract } from '@escape-room/contracts'
import { NestRequestShapes, NestResponseShapes } from '@ts-rest/nest'

export type EscapeRoomRequestShapes = NestRequestShapes<typeof escapeRoomContract>
export type EscapeRoomResponseShapes = NestResponseShapes<typeof escapeRoomContract>
