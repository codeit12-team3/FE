import { ChatListItem, ChatMessage, DateHeader } from '@/types/chat/chat.type'

import { formatKstDate } from '../common'

export const insertDateHeaders = (messages: ChatMessage[]): ChatListItem[] => {
  const result: ChatListItem[] = []
  let lastDate = ''

  messages.forEach((msg) => {
    const currentDate = formatKstDate(msg.createdAt)

    if (currentDate !== lastDate) {
      const header: DateHeader = {
        messageType: 'DATE_HEADER',
        date: currentDate,
        id: `date-header-${currentDate}`,
      }
      result.push(header)
      lastDate = currentDate
    }

    result.push(msg)
  })

  return result
}
