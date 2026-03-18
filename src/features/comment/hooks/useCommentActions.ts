import { useCommentMutations } from '../api'

export function useCommentActions(
  id: number,
  postId: number,
  parentId?: number,
) {
  const { update, remove } = useCommentMutations(postId)

  const handleDelete = () => {
    remove.mutate({ commentId: id })
  }

  const handleSave = async (editText: string) => {
    await update.mutateAsync({
      commentId: id,
      content: editText,
    })
  }

  return {
    handleDelete,
    handleSave,
    isUpdating: update.isPending,
  }
}
