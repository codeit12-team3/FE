import { ApiResponse } from '@/types/common'
import {
  ApplyCompanionRes,
  CancelCompanionRes,
  UpdateCompanionRes,
} from '@/types/companions/companions.type'

import { axios } from '../common'

export const applyCompanion = async (
  postId: string,
  applyMessage: string,
): Promise<ApplyCompanionRes> => {
  const { data } = await axios.post<ApiResponse<ApplyCompanionRes>>(
    `/v1/companions/posts/${postId}`,
    { applyMessage },
  )

  if (!data.success) {
    throw new Error(data.data.message)
  }

  return data.data
}

export const updateCompanionStatus = async (
  companionId: number,
  status: 'APPROVE' | 'DENIED',
): Promise<UpdateCompanionRes> => {
  const { data } = await axios.patch<ApiResponse<UpdateCompanionRes>>(
    `/v1/companions/${companionId}`,
    { status },
  )

  if (!data.success) {
    throw new Error(data.data.message)
  }

  return data.data
}

export const cancelCompanion = async (
  companionId: number,
): Promise<CancelCompanionRes> => {
  const { data } = await axios.delete<ApiResponse<CancelCompanionRes>>(
    `/v1/companions/${companionId}`,
  )

  if (!data.success) {
    throw new Error(data.data.message)
  }

  return data.data
}
