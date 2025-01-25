import { contract } from '@escape-room/contracts'
import { QueryClient } from '@tanstack/react-query'
import { initQueryClient } from '@ts-rest/react-query'
import { env } from './env'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
})

/* ts-rest client to communicate with our API server */
export const apiClient = initQueryClient(contract, {
  baseUrl: env.VITE_API_BASE_URL,
  credentials: 'include',
})
