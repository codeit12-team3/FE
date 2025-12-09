import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { getSession, signOut } from 'next-auth/react'

import { BASE_URL } from '@/constants/common'

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
})

// 요청 인터셉터
client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const session = await getSession()
      const accessToken = session?.user.tokenResponse.accessToken

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터
client.interceptors.response.use(
  (res: AxiosResponse) => {
    return res
  },
  async (error) => {
    const status = error.response?.status

    if (status === 401 && typeof window !== 'undefined') {
      signOut({ callbackUrl: '/signin' })
    }

    return Promise.reject(error)
  },
)

export default client
