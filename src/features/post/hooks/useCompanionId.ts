import { useMemo } from 'react'

import { useInfiniteGetSentCompanions } from '@/api/companions'
import { SentCompanionContent } from '@/types/companions'

export function useCompanionId(
  postId: string,
  propsData?: SentCompanionContent,
  enabled = true,
) {
  const { data: sentCompanionsData } = useInfiniteGetSentCompanions(
    'PENDING',
    enabled,
  )

  const companionId = useMemo(() => {
    if (propsData?.myGuestCompanionResponse?.companionId) {
      return propsData.myGuestCompanionResponse.companionId
    }

    if (!sentCompanionsData?.pages) return undefined

    const companionMap = new Map<string, string>()

    for (const page of sentCompanionsData.pages) {
      for (const item of page.content) {
        const itemPostId = String(item.postResponse.id)
        companionMap.set(itemPostId, item.myGuestCompanionResponse.companionId)
      }
    }

    return companionMap.get(String(postId))
  }, [propsData, sentCompanionsData, postId])

  return companionId
}
