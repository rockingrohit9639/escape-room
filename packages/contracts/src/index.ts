import { authContract } from './auth.contract'
import { client } from './lib/client'
import { escapeRoomContract, escapeRoomSchema } from './escape-room.contract'
import { userContract, userSchema } from './user.contract'

const contract = client.router({
  auth: authContract,
  user: userContract,
  escapeRoom: escapeRoomContract,
})

export { contract, authContract, userContract, userSchema, escapeRoomContract, escapeRoomSchema }
