import { axios } from '../common'

export const applyCompanion = async (postId: string, applyMessage: string) => {
  const response = await axios.post(`/v1/companions/posts/${postId}`, {
    applyMessage,
  })
  return response.data
}

export const updateCompanionStatus = async (
  companionId: number,
  status: 'APPROVE' | 'DENIED',
) => {
  const response = await axios.patch(`/v1/companions/${companionId}`, {
    status,
  })
  return response.data
}

export const cancelCompanion = async (companionId: number) => {
  const response = await axios.delete(`/v1/companions/${companionId}`)
  return response.data
}
