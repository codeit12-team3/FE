import { useApplyCompanion } from '@/api/companions'

export const useApply = (postId: string) => {
  const applyCompanion = useApplyCompanion()

  const handleApplyCompanion = (message: string, onSuccess?: () => void) => {
    applyCompanion.mutate(
      {
        postId,
        applyMessage: message,
      },
      {
        onSuccess,
      },
    )
  }

  return {
    handleApplyCompanion,
    isApplying: applyCompanion.isPending,
  }
}
