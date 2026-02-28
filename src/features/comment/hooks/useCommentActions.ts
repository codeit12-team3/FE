import { useCommentStore } from '@/stores/useCommentStore'

import { useCommentMutations } from '../api'

export function useCommentActions(id: number, postId: number) {
  const { update, remove } = useCommentMutations(postId)
  const updateContent = useCommentStore((state) => state.updateContent)
  const removeNode = useCommentStore((state) => state.removeNode)

  const handleDelete = () => {
    removeNode(id)
    remove.mutate({ commentId: id })
  }

  const handleSave = async (editText: string) => {
    updateContent(id, editText)
    await update.mutateAsync({
      commentId: id,
      content: editText,
    })
  }

  return { handleDelete, handleSave, isUpdating: update.isPending }
}
