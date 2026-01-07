import { ChatType } from '@/types/chat/chat.type'
import { ApiResponse } from '@/types/common'

import { axios } from '../common'

export const fetchChat = async (
  params: {
    page?: number
    size?: number
  },
  chatRoomId: number,
): Promise<ApiResponse<ChatType>> => {
  const { page = 0, size = 30 } = params

  const { data } = await axios.get<ApiResponse<ChatType>>(
    `/v1/chats/${chatRoomId}/messages`,
    {
      params: {
        page,
        size,
        sort: 'createdAt,desc',
      },
    },
  )

  return data
}

export const fetchChatCount = async (chatRoomId: number): Promise<number> => {
  const { data } = await axios.get<ApiResponse<ChatType>>(
    `/v1/chats/${chatRoomId}/messages`,
    {
      params: {
        page: 0,
        size: 1,
        sort: 'createdAt,desc',
      },
    },
  )

  return data.success ? data.data.page.totalElements : 0
}
