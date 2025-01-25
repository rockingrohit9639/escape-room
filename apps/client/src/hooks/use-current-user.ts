import { apiClient } from '~/lib/client'
import { CURRENT_USER_QUERY_KEY } from '~/lib/constants'

export function useCurrentUser() {
  return apiClient.user.me.useQuery(CURRENT_USER_QUERY_KEY)
}
