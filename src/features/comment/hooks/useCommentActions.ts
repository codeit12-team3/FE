import { useCommentMutations } from '../api'
import { CommentContent } from '../types'

export function useCommentActions(comment: CommentContent, postId: number) {
  const { update, remove } = useCommentMutations(postId)

  const handleDelete = () => {
    remove.mutate({ commentId: comment.commentId })
  }

  const handleSave = async (editText: string) => {
    await update.mutateAsync({
      commentId: comment.commentId,
      content: editText,
    })
  }

  return {
    handleDelete,
    handleSave,
    isUpdating: update.isPending,
  }
}
