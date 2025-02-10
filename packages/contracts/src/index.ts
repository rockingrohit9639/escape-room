import { authContract } from './auth.contract'
import { client } from './lib/client'
import { escapeRoomContract, ESCAPE_ROOM_DIFFICULTY, ESCAPE_ROOM_VISIBILITY } from './escape-room.contract'
import { userContract, userSchema } from './user.contract'
import { escapeRoomTagContract, escapeRoomTagSchema } from './escape-room-tag.contract'
import { stageContract, stageSchema, newStageSchema } from './stage.contract'
import { fileContract } from './file.contract'
import { imageObject, audioObject, textObject, stageObjectSchema, stageObjectContract } from './stage-object.contract'

const contract = client.router({
  auth: authContract,
  user: userContract,
  escapeRoom: escapeRoomContract,
  escapeRoomTag: escapeRoomTagContract,
  stage: stageContract,
  file: fileContract,
  stageObject: stageObjectContract,
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
  stageContract,
  stageSchema,
  fileContract,
  newStageSchema,
  stageObjectContract,
  imageObject,
  audioObject,
  textObject,
  stageObjectSchema,
}
