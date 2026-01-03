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

  useEffect(() => {
    if (!url) return

    const timer = setTimeout(() => {
      const ws = new WebSocket(url)
      socketRef.current = ws

      ws.onopen = () => {
        console.log('WebSocket 연결됨')
        setIsConnected(true)
      }

      ws.onclose = () => {
        console.log('WebSocket 연결 종료')
        setIsConnected(false)
      }

      ws.onerror = (error) => {
        console.error('WebSocket 에러:', error)
        setIsConnected(false)
      }

      ws.onmessage = (event) => {
        try {
          const newMessage = JSON.parse(event.data) as ChatMessage

          queryClient.setQueryData<InfiniteData<ApiResponse<ChatType>>>(
            ['chat', chatRoomId],
            (oldData) => {
              if (!oldData) return oldData

              return {
                ...oldData,
                pages: oldData.pages.map((page, index) => {
                  if (index === 0 && page.success && page.data) {
                    const isAlreadyAdded = page.data.content.some(
                      (m) => m.messageId === newMessage.messageId,
                    )

                    if (isAlreadyAdded) return page

                    return {
                      ...page,
                      data: {
                        ...page.data,
                        content: [newMessage, ...page.data.content],
                      },
                    } as ApiResponse<ChatType>
                  }
                  return page
                }),
              }
            },
          )
        } catch (e) {
          console.error('실시간 메시지 업데이트 에러:', e)
        }
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (socketRef.current) {
        socketRef.current.close()
        socketRef.current = null
      }
    }
  }, [url, chatRoomId, queryClient])

  const sendMessage = useCallback((msg: object) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg))
    } else {
      console.warn('WebSocket이 연결되지 않았습니다.')
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
