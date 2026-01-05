import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { ChatMessage, ChatType } from '@/types/chat/chat.type'
import { ApiResponse } from '@/types/common'

import { updateChatInfiniteCache } from './updateChatInfiniteCache'

export const useChatSocket = (chatRoomId: number) => {
  const queryClient = useQueryClient()

  const onMessageReceived = useCallback(
    (newMessage: ChatMessage) => {
      queryClient.setQueryData<InfiniteData<ApiResponse<ChatType>>>(
        ['chat', chatRoomId],
        (old) => updateChatInfiniteCache(old, newMessage),
      )
    },
    [chatRoomId, queryClient],
  )

  return { onMessageReceived }
}
