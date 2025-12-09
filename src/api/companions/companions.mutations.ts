import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  ApplyCompanionRes,
  CancelCompanionRes,
  UpdateCompanionRes,
} from '@/types/companions/companions.type'

import {
  applyCompanion,
  cancelCompanion,
  updateCompanionStatus,
} from './companions.clients'

export const useApplyCompanion = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ApplyCompanionRes,
    Error,
    { postId: string; applyMessage: string }
  >({
    mutationFn: ({ postId, applyMessage }) =>
      applyCompanion(postId, applyMessage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useUpdateCompanionStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateCompanionRes,
    Error,
    { companionId: number; status: 'APPROVE' | 'DENIED' }
  >({
    mutationFn: ({ companionId, status }) =>
      updateCompanionStatus(companionId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useCancelCompanion = () => {
  const queryClient = useQueryClient()

  return useMutation<CancelCompanionRes, Error, number>({
    mutationFn: (companionId) => cancelCompanion(companionId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
