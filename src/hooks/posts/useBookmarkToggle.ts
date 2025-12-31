import { useAddBookmark, useRemoveBookmark } from '@/api/posts'

export const useBookmarkToggle = (postId: string, isBookmarked: boolean) => {
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()

  const toggleBookmark = async (e?: React.MouseEvent) => {
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
