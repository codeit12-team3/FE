import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  applyCompanion,
  cancelCompanion,
  updateCompanionStatus,
} from './companion.client'

export const useApplyCompanion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      postId,
      applyMessage,
    }: {
      postId: string
      applyMessage: string
    }) => applyCompanion(postId, applyMessage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useUpdateCompanionStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      companionId,
      status,
    }: {
      companionId: number
      status: 'APPROVE' | 'DENIED'
    }) => updateCompanionStatus(companionId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useCancelCompanion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (companionId: number) => cancelCompanion(companionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
