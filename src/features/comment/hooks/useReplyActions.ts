import { useCommentStore } from '@/stores/useCommentStore'

import { useReplyMutations } from '../api'

export function useReplyActions(id: number, postId: number, parentId: number) {
  const { update, remove } = useReplyMutations(postId, parentId)

  const updateContent = useCommentStore((state) => state.updateContent)
  const removeNode = useCommentStore((state) => state.removeNode)

  const handleDelete = () => {
    removeNode(id, parentId)
    remove.mutate({ commentId: id })
  }

  const handleSave = async (editText: string) => {
    updateContent(id, editText)
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
