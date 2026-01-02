import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { signOut } from 'next-auth/react'

import { BASE_URL, TIMEOUT_LIMIT } from '@/constants/common'
import { ApiResponse } from '@/types/common'

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUT_LIMIT,
  withCredentials: true,
})

let isSignout = false

// 응답 인터셉터
client.interceptors.response.use(
  (res: AxiosResponse) => {
    return res
  },
  async (error: AxiosError<ApiResponse>) => {
    const res = error.response

    if (res && res.status === 401) {
      const apiRes = res.data

      const shouldLogout =
        !apiRes ||
        (apiRes.success === false &&
          apiRes.data.code !== 'AUTH_011' &&
          apiRes.data.code !== 'AUTH_008')

      if (shouldLogout && typeof window !== 'undefined') {
        if (!isSignout) {
          isSignout = true

          try {
            await signOut({ callbackUrl: '/signin' })
          } finally {
            isSignout = false
          }
        }

        return Promise.reject(new Error('로그인 시간이 만료되었습니다'))
      }
    }

    return Promise.reject(error)
  },
)

export default client
