import { authContract } from './auth.contract'
import { client } from './lib/client'
import { userContract, userSchema } from './user.contract'

const contract = client.router({
  auth: authContract,
  user: userContract,
})

export { contract, authContract, userContract, userSchema }
