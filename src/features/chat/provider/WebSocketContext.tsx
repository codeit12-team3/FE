'use client'

import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { ChatMessage, ChatType } from '@/features/chat/types/chat.type'
import { updateChatInfiniteCache } from '@/lib/chat/updateChatInfiniteCache'
import { ApiResponse } from '@/types/common'

interface WebSocketContextType {
  sendMessage: (msg: object) => void
  isConnected: boolean
}

const WebSocketContext = createContext<WebSocketContextType | null>(null)

export const WebSocketProvider = ({
  url,
  chatRoomId,
  children,
}: {
  url: string
  chatRoomId: number
  children: React.ReactNode
}) => {
  const socketRef = useRef<WebSocket | null>(null)
  const queryClient = useQueryClient()
  const [isConnected, setIsConnected] = useState(false)
  const reconnectCountRef = useRef(0)
  const maxReconnectDelay = 30000

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const newMessage = JSON.parse(event.data) as ChatMessage
        queryClient.setQueryData<InfiniteData<ApiResponse<ChatType>>>(
          ['chat', chatRoomId],
          (oldData) => updateChatInfiniteCache(oldData, newMessage),
        )
      } catch (e) {
        console.error(e)
      }
    },
    [chatRoomId, queryClient],
  )

  const connect = useCallback(
    function connect() {
      if (!url || typeof window === 'undefined') return
      if (socketRef.current?.readyState === WebSocket.CONNECTING) return

      const ws = new WebSocket(url)
      socketRef.current = ws

      ws.onopen = () => {
        setIsConnected(true)
        reconnectCountRef.current = 0
      }

      ws.onmessage = handleMessage

      ws.onclose = (event) => {
        setIsConnected(false)

        if (event.code !== 1000) {
          const delay = Math.min(
            1000 * Math.pow(2, reconnectCountRef.current),
            maxReconnectDelay,
          )

          setTimeout(() => {
            reconnectCountRef.current += 1
            connect()
          }, delay)
        }
      }

      ws.onerror = () => {
        ws.close()
      }
    },
    [url, handleMessage],
  )

  useEffect(() => {
    connect()

    return () => {
      if (socketRef.current) {
        socketRef.current.close(1000)
        socketRef.current = null
      }
    }
  }, [connect])

  const sendMessage = useCallback((msg: object) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg))
    }
  }, [])

  return (
    <WebSocketContext.Provider value={{ sendMessage, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWS = () => {
  const context = useContext(WebSocketContext)
  if (!context) throw new Error('WebWocketProvider를 사용해야 합니다.')
  return context
}
