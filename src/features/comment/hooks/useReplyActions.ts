import { useReplyMutations } from '@/features/comment/api'
import { useCommentStore } from '@/features/comment/stores/useCommentStore'

export function useReplyActions(id: number, postId: number, parentId: number) {
  const { updateReplyMutation, removeReplyMutation } = useReplyMutations(
    postId,
    parentId,
  )

  const updateContent = useCommentStore((state) => state.updateContent)
  const removeNode = useCommentStore((state) => state.removeNode)

  const handleDelete = () => {
    removeNode(id, parentId)
    removeReplyMutation.mutate({ commentId: id })
  }

  const handleSave = async (editText: string) => {
    updateContent(id, editText)
    await updateReplyMutation.mutateAsync({
      commentId: id,
      content: editText,
    })
  }

  return {
    handleDelete,
    handleSave,
    isUpdating: updateReplyMutation.isPending,
  }
}
