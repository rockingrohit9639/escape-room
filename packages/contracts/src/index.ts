import { authContract } from './auth.contract'
import { client } from './lib/client'
import { escapeRoomContract, ESCAPE_ROOM_DIFFICULTY, ESCAPE_ROOM_VISIBILITY } from './escape-room.contract'
import { userContract, userSchema } from './user.contract'
import { escapeRoomTagContract, escapeRoomTagSchema } from './escape-room-tag.contract'

const contract = client.router({
  auth: authContract,
  user: userContract,
  escapeRoom: escapeRoomContract,
  escapeRoomTag: escapeRoomTagContract,
})

export {
  contract,
  authContract,
  userContract,
  userSchema,
  escapeRoomContract,
  ESCAPE_ROOM_DIFFICULTY,
  ESCAPE_ROOM_VISIBILITY,
  escapeRoomTagSchema,
}
