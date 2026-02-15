import { useReplyMutations } from '../api'
import { ReplyContent } from '../types'

export function useReplyActions(
  reply: ReplyContent,
  postId: number,
  parentId: number,
) {
  const { update, remove } = useReplyMutations(postId, parentId)

  const handleDelete = () => {
    remove.mutate({ commentId: reply.commentId })
  }

  const handleSave = async (editText: string) => {
    await update.mutateAsync({
      commentId: reply.commentId,
      content: editText,
    })
  }

  return {
    handleDelete,
    handleSave,
    isUpdating: update.isPending,
  }
}
