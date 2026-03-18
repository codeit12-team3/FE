import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { toast } from '@/components/common'
import { useCommentStore } from '@/features/comment/stores'
import { GetRepliesResponse } from '@/features/comment/types'
import { ApiResponse } from '@/types/common'

import { commentKeys, replyKeys } from './queryKeys'
import { createReply, deleteReply, updateReply } from './replies.http'

type ReplyListCache = InfiniteData<ApiResponse<GetRepliesResponse>>

export const useReplyMutations = (postId: number, parentId: number) => {
  const queryClient = useQueryClient()
  const replyListKey = replyKeys.list(parentId)
  const commentListKey = commentKeys.list(postId)
  const postDetailKey = ['postDetail', String(postId)] as const

  const updateContent = useCommentStore((state) => state.updateContent)
  const removeCommentEntity = useCommentStore(
    (state) => state.removeCommentEntity,
  )

  const createReplyMutation = useMutation({
    mutationFn: createReply,
    onSuccess: async () => {
      // replyList: 새 답글 목록 반영
      // commentList: 부모 댓글의 commentsCount 갱신
      // postDetail: 게시글 전체 댓글 수 갱신
      await queryClient.invalidateQueries({ queryKey: replyListKey })
      await queryClient.invalidateQueries({ queryKey: commentListKey })
      await queryClient.invalidateQueries({ queryKey: postDetailKey })
      toast.success('답글이 작성되었습니다')
    },
  })

  const updateReplyMutation = useMutation({
    mutationFn: updateReply,
    onSuccess: () => {
      toast.success('답글이 수정되었습니다.')
    },
    onMutate: async (variables) => {
      // 진행 중인 쿼리를 취소해 낙관적 업데이트가 서버 응답에 덮어씌워지는 것을 방지
      await queryClient.cancelQueries({ queryKey: replyListKey })
      const previousReplies =
        queryClient.getQueryData<ReplyListCache>(replyListKey)

      // React Query 캐시 갱신 전에 Zustand 스토어를 먼저 업데이트해 즉각적인 UI 반영
      updateContent(variables.commentId, variables.content)

      // onError 롤백에 사용할 이전 상태 반환
      return { previousReplies }
    },
    onError: (err, variables, context) => {
      if (context?.previousReplies) {
        queryClient.setQueryData<ReplyListCache>(
          replyListKey,
          context.previousReplies,
        )
      }
      toast.error('답글 수정에 실패했습니다.')
    },
    // 성공/실패 여부와 무관하게 최종적으로 서버 상태와 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: replyListKey })
    },
  })

  const removeReplyMutation = useMutation({
    mutationFn: deleteReply,
    onSuccess: async () => {
      // 답글 삭제 시 부모 댓글의 commentsCount와 게시글 댓글 수도 함께 갱신
      await queryClient.invalidateQueries({ queryKey: commentListKey })
      await queryClient.invalidateQueries({ queryKey: postDetailKey })
      toast.success('답글이 삭제되었습니다.')
    },
    onMutate: async (variables) => {
      // 진행 중인 쿼리를 취소해 낙관적 삭제가 서버 응답에 덮이는 것을 방지
      await queryClient.cancelQueries({ queryKey: replyListKey })
      const previousReplies =
        queryClient.getQueryData<ReplyListCache>(replyListKey)

      // parentId를 전달해 cascadeRemoveNode가 부모 댓글의 childrenIds도 정리
      removeCommentEntity(variables.commentId, parentId)

      return { previousReplies }
    },
    onError: (err, variables, context) => {
      if (context?.previousReplies) {
        queryClient.setQueryData<ReplyListCache>(
          replyListKey,
          context.previousReplies,
        )
      }
      toast.error('답글 삭제에 실패했습니다.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: replyListKey })
    },
  })

  return { createReplyMutation, updateReplyMutation, removeReplyMutation }
}
