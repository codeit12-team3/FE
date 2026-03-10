import { useCommentMutations } from '../api'

export function useCommentActions(id: number, postId: number) {
  const { updateCommentMutation, removeCommentMutation } =
    useCommentMutations(postId)

  const handleDelete = () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      removeCommentMutation.mutate({ commentId: id })
    }
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
