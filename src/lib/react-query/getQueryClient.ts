import {
  defaultShouldDehydrateQuery,
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

function handleGlobalError(error: unknown, meta?: Record<string, unknown>) {
  if (isServer || meta?.ignoreGlobalError) return

  let message = '알 수 없는 에러가 발생했습니다.'

  if (axios.isAxiosError(error)) {
    // TODO: 서버가 던져주는 타입으로 명시
    const axiosError = error as AxiosError<{ message: string }>
    message = axiosError.response?.data?.message || axiosError.message
  } else if (error instanceof Error) {
    message = error.message
  }

  toast.error(message)
}

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => handleGlobalError(error, query?.meta),
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) =>
        handleGlobalError(error, mutation?.meta),
    }),
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export default function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
