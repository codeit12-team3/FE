import { useApplyCompanion } from '@/api/companions'
import { toast } from '@/components/common'

export const useApply = (postId: string) => {
  const applyCompanion = useApplyCompanion()

  const handleApplyCompanion = (message: string, onSuccess?: () => void) => {
    applyCompanion.mutate(
      {
        postId,
        applyMessage: message,
      },
      {
        onSuccess: () => {
          toast.success('동행 신청이 완료되었습니다')
          onSuccess?.()
        },
      },
    )
  }

  return {
    handleApplyCompanion,
    isApplying: applyCompanion.isPending,
  }
}
