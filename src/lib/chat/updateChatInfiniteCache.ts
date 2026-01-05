import { InfiniteData } from '@tanstack/react-query'

import { ChatMessage, ChatType } from '@/types/chat/chat.type'
import { ApiResponse } from '@/types/common'

export const updateChatInfiniteCache = (
  oldData: InfiniteData<ApiResponse<ChatType>> | undefined,
  newMessage: ChatMessage,
) => {
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
        }
      }
      return page
    }),
  }
}
