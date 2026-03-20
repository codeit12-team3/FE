import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { toast } from '@/components/common'
import { useAddBookmark, useRemoveBookmark } from '@/features/post/api'

export const useBookmarkToggle = (postId: string, isBookmarked: boolean) => {
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()
  const session = useSession()
  const router = useRouter()
  const toggleBookmark = async (e?: React.MouseEvent) => {
    if (!session?.data?.user) {
      toast.error('로그인이 필요한 서비스입니다.')
      router.push('/auth/signin')
      return
    }
    e?.stopPropagation()

    if (isBookmarked) {
      await removeBookmark.mutateAsync(postId)
    } else {
      await addBookmark.mutateAsync(postId)
    }
  }

  return {
    toggleBookmark,
    isPending: addBookmark.isPending || removeBookmark.isPending,
  }
}
