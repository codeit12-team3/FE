// comment/hooks/useCommentActions.ts
import { useCommentStore } from '@/stores/useCommentStore'

import { useCommentMutations } from '../api'

export function useCommentActions(id: number, postId: number) {
  const { updateCommentMutation, removeCommentMutation } =
    useCommentMutations(postId)
  const { updateContent, removeNode } = useCommentStore()

  const handleDelete = () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      removeNode(id)
      removeCommentMutation.mutate({ commentId: id })
    }
  }

  const handleSave = async (editText: string) => {
    updateContent(id, editText)
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
