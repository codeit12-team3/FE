import { axios } from '@/api/common'
import { BASE_URL } from '@/constants/common'
import { ChatRoomType } from '@/features/chat/types/chatRoom.types'
import { ApiResponse } from '@/types/common'

export const fetchChatRooms = async (params: {
  page?: number
  size?: number
  keyword?: string
}): Promise<ApiResponse<ChatRoomType>> => {
  const { page = 0, size = 50, keyword } = params

  const { data } = await axios.get<ApiResponse<ChatRoomType>>('/v1/chats', {
    params: {
      page,
      size,
      sort: 'createdAt,desc',
      ...(keyword && { keyword }),
    },
  })

  return data
}

export const leaveChatroom = ({
  chatParticipantId,
}: {
  chatParticipantId: number
}) => {
  fetch(`${BASE_URL}/v1/chats/${chatParticipantId}/out`, {
    method: 'PATCH',
    keepalive: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  }).catch((err) => console.error('퇴장 처리 실패:', err))
}
