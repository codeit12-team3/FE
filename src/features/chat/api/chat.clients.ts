import { axios } from '@/api/common'
import { ChatType } from '@/features/chat/types/chat.type'
import { ApiResponse } from '@/types/common'

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
