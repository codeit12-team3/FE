import {
  defaultShouldDehydrateQuery,
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query'
import axios from 'axios'

import { toast } from '@/components/common'
import { STALE_TIME } from '@/constants/common'
import { ApiResponse } from '@/types/common'

function handleGlobalError(
  error: unknown,
  queryClient: QueryClient,
  meta?: Record<string, unknown>,
) {
  if (isServer || meta?.ignoreGlobalError) return

  if (
    axios.isAxiosError<ApiResponse>(error) &&
    error.response?.status === 401
  ) {
    const apiRes = error.response?.data
    const errCode = apiRes?.success === false ? apiRes.data?.code : null

    if (errCode === 'AUTH_008') return
    if (!apiRes.success && errCode === 'AUTH_011') {
      return toast.error(apiRes.data.message)
    }

    queryClient.clear()
    return toast.error('로그인이 필요합니다')
  }

  let message = '알 수 없는 에러가 발생했습니다.'
  if (axios.isAxiosError<ApiResponse>(error)) {
    const res = error.response?.data
    message = res?.success === false ? res.data.message : error.message
  } else if (error instanceof Error) {
    message = error.message
  }

  toast.error(message)
}

const makeQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME.MINUTE,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
    queryCache: new QueryCache({
      onError: (error, query): void => {
        handleGlobalError(error, queryClient, query?.meta)
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation): void => {
        handleGlobalError(error, queryClient, mutation?.meta)
      },
    }),
  })

  return queryClient
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
