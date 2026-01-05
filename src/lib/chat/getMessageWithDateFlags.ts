import { ChatMessage } from '@/types/chat/chat.type'

import { formatKstDate } from '../common'

export const getMessageWithDateFlags = (messages: ChatMessage[]) => {
  return messages.map((msg, index) => {
    const currentDate = formatKstDate(msg.createdAt)
    const prevDate =
      index > 0 ? formatKstDate(messages[index - 1].createdAt) : null

    return {
      ...msg,
      shouldShowDate: currentDate !== prevDate,
    }
  })
}
