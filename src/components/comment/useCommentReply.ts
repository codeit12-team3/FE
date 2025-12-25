import { useEditingStore } from './useEditingStore'
import { useReplyingStore } from './useReplyingStore'

export function useCommentReply(commentId: number) {
  const replyingToCommentId = useReplyingStore(
    (state) => state.replyingToCommentId,
  )
  const setReplyingToComment = useReplyingStore(
    (state) => state.setReplyingToComment,
  )
  const setEditingComment = useEditingStore((state) => state.setEditingComment)

  const isReplying = replyingToCommentId === commentId

  const startReply = () => {
    setReplyingToComment(commentId)
    setEditingComment(null)
  }

  const cancelReply = () => {
    setReplyingToComment(null)
  }

  return { isReplying, startReply, cancelReply }
}
