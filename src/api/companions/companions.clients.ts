import { ApiResponse } from '@/types/common'
import {
  ApplyCompanionReq,
  ApplyCompanionRes,
  CompanionState,
  ReceivedCompanionRes,
  SentCompanionRes,
  UpdateCompanionReq,
} from '@/types/companions'

import { axios } from '../common'

export const applyCompanion = async ({
  postId,
  applyMessage,
}: ApplyCompanionReq) => {
  const { data } = await axios.post<ApiResponse<ApplyCompanionRes>>(
    `/v1/companions/posts/${postId}`,
    { applyMessage },
  )

  if (!data.success) {
    throw new Error(data.data.message)
  }

  return data.data
}

export const updateCompanionStatus = async ({
  companionId,
  status,
}: UpdateCompanionReq) => {
  await axios.patch(`/v1/companions/${companionId}`, { status })
}

export const cancelCompanion = async (companionId: string) => {
  await axios.delete(`/v1/companions/${companionId}`)
}

export const getReceivedCompanion = async (
  status: CompanionState,
  page: number,
) => {
  const { data } = await axios.get<ApiResponse<ReceivedCompanionRes>>(
    '/v1/companions/received',
    {
      params: {
        status,
        page,
        size: 10,
      },
    },
  )

  if (!data.success) {
    throw new Error(data.data.message)
  }

  return data.data
}

export const getSentCompanion = async (
  status: CompanionState,
  page: number,
) => {
  const { data } = await axios.get<ApiResponse<SentCompanionRes>>(
    '/v1/companions/sent',
    {
      params: {
        status,
        page,
        size: 10,
      },
    },
  )

  if (!data.success) {
    throw new Error(data.data.message)
  }

  return data.data
}
