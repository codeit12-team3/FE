import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

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
  (config: InternalAxiosRequestConfig) => {
    // TODO: 헤더에 토큰 추가 로직

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터
client.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data
  },
  async (error) => {
    // TODO: 공통 에러 처리 로직
    const status = error.response?.status

    if (status === 401) {
      // TODO: 리프레시 토큰 로직
    }

    return Promise.reject(error)
  },
)

export default client
