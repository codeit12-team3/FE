import { InfiniteData } from '@tanstack/react-query'

import { ApiResponse } from '@/types/common'

import { CommentType } from '../../types'

export type CommentListCache = InfiniteData<ApiResponse<CommentType>>

export const updateCommentInCache = (
  oldData: CommentListCache | undefined,
  commentId: number,
  newContent: string,
): CommentListCache | undefined => {
  if (!oldData) return oldData

  return {
    ...oldData,
    pages: oldData.pages.map((page) => {
      if (!page.success) return page
      return {
        ...page,
        data: {
          ...page.data,
          content: page.data.content.map((comment) =>
            comment.commentId === commentId
              ? { ...comment, content: newContent, isUpdated: true }
              : comment,
          ),
        },
      }
    }),
  }
}

export const removeCommentFromCache = (
  oldData: CommentListCache | undefined,
  commentId: number,
): CommentListCache | undefined => {
  if (!oldData) return oldData

  return {
    ...oldData,
    pages: oldData.pages.map((page) => {
      if (!page.success) return page
      return {
        ...page,
        data: {
          ...page.data,
          content: page.data.content.filter(
            (comment) => comment.commentId !== commentId,
          ),
        },
      }
    }),
  }
}
