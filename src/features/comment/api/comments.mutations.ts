import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { toast } from '@/components/common'
import { useCommentStore } from '@/features/comment/stores'
import { GetCommentsResponse } from '@/features/comment/types'
import { ApiResponse } from '@/types/common'

import { createComment, deleteComment, updateComment } from './comments.http'
import { commentKeys } from './queryKeys'

type CommentListCache = InfiniteData<ApiResponse<GetCommentsResponse>>

export const useCommentMutations = (postId: number) => {
  const queryClient = useQueryClient()
  const queryKey = commentKeys.list(postId)
  const postDetailKey = ['postDetail', String(postId)] as const

  const updateContent = useCommentStore((state) => state.updateContent)
  const removeCommentEntity = useCommentStore(
    (state) => state.removeCommentEntity,
  )

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey })
      await queryClient.invalidateQueries({ queryKey: postDetailKey })
      toast.success('댓글이 작성되었습니다')
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      toast.success('댓글이 수정되었습니다.')
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey })
      const previousComments =
        queryClient.getQueryData<CommentListCache>(queryKey)

      updateContent(variables.commentId, variables.content)

      return { previousComments }
    },
    onError: (err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData<CommentListCache>(
          queryKey,
          context.previousComments,
        )
      }
      toast.error('댓글 수정에 실패했습니다.')
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })

  const removeCommentMutation = useMutation({
    mutationFn: ({ commentId }: { commentId: number; parentId?: number }) =>
      deleteComment({ commentId }),
    onMutate: async ({ commentId, parentId }) => {
      await queryClient.cancelQueries({ queryKey })
      const previousComments =
        queryClient.getQueryData<CommentListCache>(queryKey)

      removeCommentEntity(commentId, parentId)

      return { previousComments }
    },
    onError: (err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData<CommentListCache>(
          queryKey,
          context.previousComments,
        )
      }
      toast.error('댓글 삭제에 실패했습니다.')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postDetailKey })
      toast.success('댓글이 삭제되었습니다.')
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })

  return { createCommentMutation, updateCommentMutation, removeCommentMutation }
}
