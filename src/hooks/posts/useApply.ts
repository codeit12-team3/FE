import { useState } from 'react'

import { useApplyCompanion } from '@/api/companions'

export const useApply = (postId: string) => {
  const applyCompanion = useApplyCompanion()
  const [applyMessage, setApplyMessage] = useState('')

  const handleApplyCompanion = (onSuccess?: () => void) => {
    applyCompanion.mutate(
      {
        postId,
        applyMessage,
      },
      {
        onSuccess,
      },
    )
  }

  return {
    applyMessage,
    setApplyMessage,
    handleApplyCompanion,
    isApplying: applyCompanion.isPending,
  }
}
