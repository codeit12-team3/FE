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
  const { page = 0, size = 10 } = params

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
