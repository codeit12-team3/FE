import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ApplyCompanionReq, UpdateCompanionReq } from '@/types/companions'

import {
  applyCompanion,
  cancelCompanion,
  updateCompanionStatus,
} from './companions.clients'

export const useApplyCompanion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (req: ApplyCompanionReq) => applyCompanion(req),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
      queryClient.invalidateQueries({ queryKey: ['companions'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useUpdateCompanionStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: UpdateCompanionReq) => updateCompanionStatus(req),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useCancelCompanion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (companionId: string) => cancelCompanion(companionId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
