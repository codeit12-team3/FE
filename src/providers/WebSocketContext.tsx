// components/chat/WebSocketProvider.tsx
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

import { updateChatInfiniteCache } from '@/lib/chat/updateChatInfiniteCache'
import { ChatMessage, ChatType } from '@/types/chat/chat.type'
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

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const newMessage = JSON.parse(event.data) as ChatMessage
        queryClient.setQueryData<InfiniteData<ApiResponse<ChatType>>>(
          ['chat', chatRoomId],
          (oldData) => updateChatInfiniteCache(oldData, newMessage),
        )
      } catch (e) {
        console.error('메시지 처리 에러:', e)
      }
    },
    [chatRoomId, queryClient],
  )

  useEffect(() => {
    if (!url) return

    const ws = new WebSocket(url)
    socketRef.current = ws

    ws.onopen = () => {
      console.log('WebSocket 연결됨')
      setIsConnected(true)
    }
    ws.onclose = () => setIsConnected(false)
    ws.onerror = () => setIsConnected(false)
    ws.onmessage = handleMessage

    return () => {
      ws.close()
      socketRef.current = null
    }
  }, [url, handleMessage])

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
  if (!context) throw new Error('WebSocketProvider 내부에서 사용하세요.')
  return context
}
