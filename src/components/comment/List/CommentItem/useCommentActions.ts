import { useCommentMutations } from '@/api/comments'
import { useReplyMutations } from '@/api/comments/replies.mutations'
import { CommentContent, ReplyContent } from '@/types/comments/comments.type'

import { useCommentInteraction } from '../../CommentInteractionContext'

export const useCommentActions = (
  comment: CommentContent | ReplyContent,
  isReply: boolean,
  postId: number,
) => {
  const { editText, startEdit, cancelEdit, closeReplyForm } =
    useCommentInteraction()

  const parentId = isReply ? (comment as ReplyContent).parentId : undefined

  const commentMutations = useCommentMutations(postId)
  const replyMutations = useReplyMutations(postId, parentId ?? 0)

  const handleDelete = () => {
    if (isReply && parentId) {
      replyMutations.remove.mutate({
        commentId: comment.commentId,
      })
    } else {
      commentMutations.remove.mutate({
        commentId: comment.commentId,
      })
    }
  }

  const handleSave = () => {
    if (isReply && parentId) {
      replyMutations.update.mutate({
        commentId: comment.commentId,
        content: editText,
      })
    }
    if (editText === comment.content) {
      // 내용이 변경되지 않았으면 그냥 취소
      cancelEdit()
      return
    }

    commentMutations.update.mutate({
      commentId: comment.commentId,
      content: editText,
    })

    cancelEdit()
  }

  const handleStartEdit = () => {
    closeReplyForm()
    startEdit(comment.commentId, comment.content)
  }

  return {
    handleDelete,
    handleSave,
    handleStartEdit,
    commentUpdating: commentMutations.update.isPending,
    commentDeleting: commentMutations.remove.isPending,
    replyUpdating: replyMutations.update.isPending,
    replyDeleting: replyMutations.remove.isPending,
  }
}
