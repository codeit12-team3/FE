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

// 응답 인터셉터
client.interceptors.response.use(
  (res: AxiosResponse) => {
    return res
  },
  async (error: AxiosError<ApiResponse>) => {
    const res = error.response

    if (res && res.status === 401) {
      const apiRes = res.data

      if (apiRes.success === false) {
        const errCode = apiRes.data.code

        if (errCode !== 'AUTH_011' && typeof window !== 'undefined') {
          await signOut({ callbackUrl: '/signin' })

          return new Promise(() => {})
        }
      }
    }

    return Promise.reject(error)
  },
)

export default client
