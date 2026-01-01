import { ChatRoomType } from '@/types/chat/chats.types'
import { ApiResponse } from '@/types/common'

import { axios } from '../common'

export const fetchChatRooms = async (params: {
  page?: number
  size?: number
  keyword?: string
}): Promise<ApiResponse<ChatRoomType>> => {
  const { page = 0, size = 20, keyword } = params

  const { data } = await axios.get<ApiResponse<ChatRoomType>>('/v1/chats', {
    params: {
      page,
      size,
      sort: 'createdAt,desc',
      keyword,
    },
  })

  return data
}
