import { useReplyMutations } from '@/features/comment/api'

export function useReplyActions(id: number, postId: number, parentId: number) {
  const { updateReplyMutation, removeReplyMutation } = useReplyMutations(
    postId,
    parentId,
  )

  const handleDelete = () => {
    removeReplyMutation.mutate({ commentId: id })
  }

  const handleSave = async (editText: string) => {
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
