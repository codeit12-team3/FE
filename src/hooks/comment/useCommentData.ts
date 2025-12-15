import { useMemo } from 'react'

import { useComments } from '@/api/comments'

export function useCommentData(postId: string) {
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    isFetchingNextPage,
  } = useComments({
    postId,
  })

  const { parents, replies } = useMemo(() => {
    if (!comments) return { parents: [], replies: [] }

    const allComments = comments.pages.flatMap((page) => {
      if (!page.success || !page.data) return []
      return page.data.content
    })

    return {
      parents: allComments.filter((c) => c.parentId === null),
      replies: allComments.filter((c) => c.parentId !== null),
    }
  }, [comments])

  return {
    parents,
    replies,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
