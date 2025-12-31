import { ApiResponse } from '@/types/common'
import { NotificationReq, NotificationRes } from '@/types/notifications'

import { axios } from '../common'

export const getNotifications = async (params: NotificationReq) => {
  const { data } = await axios.get<ApiResponse<NotificationRes>>(
    '/v1/notifications',
    {
      params,
    },
  )

  if (!data.success) {
    throw new Error(data.data.message)
  }

  return data.data
}
