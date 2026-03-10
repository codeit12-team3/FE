import { useCommentMutations } from '@/features/comment/api'

export function useCommentActions(id: number, postId: number) {
  const { updateCommentMutation, removeCommentMutation } =
    useCommentMutations(postId)

  const handleDelete = () => {
    removeCommentMutation.mutate({ commentId: id })
  }

  const handleSave = async (editText: string) => {
    return updateCommentMutation.mutateAsync({
      commentId: id,
      content: editText,
    })
  }

  return {
    handleDelete,
    handleSave,
    isUpdating: updateCommentMutation.isPending,
  }
}
