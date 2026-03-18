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
      // 댓글 목록과 게시글 상세의 댓글 수를 순차적으로 갱신
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
      // 진행 중인 쿼리를 취소해 낙관적 업데이트가 서버 응답에 덮어씌워지는 것을 방지
      await queryClient.cancelQueries({ queryKey })
      const previousComments =
        queryClient.getQueryData<CommentListCache>(queryKey)

      // React Query 캐시 갱신 전에 Zustand 스토어를 먼저 업데이트해 즉각적인 UI 반영
      updateContent(variables.commentId, variables.content)

      // onError 롤백에 사용할 이전 상태 반환
      return { previousComments }
    },
    onError: (err, variables, context) => {
      // 서버 요청 실패 시 Zustand가 아닌 React Query 캐시를 복원
      // Zustand는 onSettled의 invalidateQueries로 서버 상태와 자동 동기화됨
      if (context?.previousComments) {
        queryClient.setQueryData<CommentListCache>(
          queryKey,
          context.previousComments,
        )
      }
      toast.error('댓글 수정에 실패했습니다.')
    },
    // 성공/실패 여부와 무관하게 마지막에 서버 상태와 동기화
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })

  const removeCommentMutation = useMutation({
    mutationFn: ({ commentId }: { commentId: number; parentId?: number }) =>
      deleteComment({ commentId }),
    onMutate: async ({ commentId, parentId }) => {
      // 진행 중인 쿼리를 취소해 낙관적 삭제가 서버 응답에 덮이는 것을 방지
      await queryClient.cancelQueries({ queryKey })
      const previousComments =
        queryClient.getQueryData<CommentListCache>(queryKey)

      // parentId를 전달해 cascadeRemoveNode가 트리 구조를 올바르게 정리하도록 함
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
      // 댓글 삭제 시 게시글 상세의 댓글 수도 갱신
      await queryClient.invalidateQueries({ queryKey: postDetailKey })
      toast.success('댓글이 삭제되었습니다.')
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })

  return { createCommentMutation, updateCommentMutation, removeCommentMutation }
}
