'use client'

import { InternalAxiosRequestConfig } from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { axios } from '@/api/common'

interface Props {
  children: React.ReactNode
}

export default function ClientProvider({ children }: Props) {
  const { data: session } = useSession()

  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = session?.user.accessToken

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    return () => {
      axios.interceptors.request.eject(reqInterceptor)
    }
  }, [session])

  return <>{children}</>
}
