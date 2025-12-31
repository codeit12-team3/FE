import { ChatRoomFilters, ChatRoomType } from '@/types/chat/chats.types'
import { ApiResponse } from '@/types/common'

import { axios } from '../common'

export const fetchChatRooms = async (
  params: {
    page?: number
    size?: number
  } & ChatRoomFilters,
): Promise<ApiResponse<ChatRoomType>> => {
  const { page = 0, size = 20, ...filters } = params

  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  )

  const { data } = await axios.get<ApiResponse<ChatRoomType>>('/v1/chats', {
    params: {
      page,
      size,
      sort: 'createdAt,desc',
      ...activeFilters,
    },
  })

  return data
}
