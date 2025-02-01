import { NestRequestShapes, NestResponseShapes } from '@ts-rest/nest'
import { escapeRoomTagContract } from 'packages/contracts/src/escape-room-tag.contract'

export type EscapeRoomTagRequestShapes = NestRequestShapes<typeof escapeRoomTagContract>
export type EscapeRoomTagResponseShapes = NestResponseShapes<typeof escapeRoomTagContract>
