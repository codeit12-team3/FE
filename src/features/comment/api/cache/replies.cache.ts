import { InfiniteData } from '@tanstack/react-query'

import { ApiResponse } from '@/types/common'

import { ReplyType } from '../../types'

export type ReplyListCache = InfiniteData<ApiResponse<ReplyType>>

export const updateReplyInCache = (
  oldData: ReplyListCache | undefined,
  commentId: number,
  newContent: string,
): ReplyListCache | undefined => {
  if (!oldData) return oldData

  return {
    ...oldData,
    pages: oldData.pages.map((page) => {
      if (!page.success) return page
      return {
        ...page,
        data: {
          ...page.data,
          content: page.data.content.map((reply) =>
            reply.commentId === commentId
              ? { ...reply, content: newContent, isUpdated: true }
              : reply,
          ),
        },
      }
    }),
  }
}

export const removeReplyFromCache = (
  oldData: ReplyListCache | undefined,
  commentId: number,
): ReplyListCache | undefined => {
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
            (reply) => reply.commentId !== commentId,
          ),
        },
      }
    }),
  }
}
