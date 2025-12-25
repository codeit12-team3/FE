import { useEffect, useState } from 'react'

import { useEditingStore } from './useEditingStore'
import { useReplyingStore } from './useReplyingStore'

export function useCommentEdit(
  commentId: number,
  content: string,
  onSave: (text: string) => Promise<void>,
) {
  const editingCommentId = useEditingStore((state) => state.editingCommentId)
  const setEditingComment = useEditingStore((state) => state.setEditingComment)
  const setReplyingToComment = useReplyingStore(
    (state) => state.setReplyingToComment,
  )

  const [editText, setEditText] = useState(content)

  const isEditing = editingCommentId === commentId

  useEffect(() => {
    setEditText(content)
  }, [content])

  const startEdit = () => {
    setEditingComment(commentId)
    setReplyingToComment(null)
    setEditText(content)
  }

  const cancelEdit = () => {
    setEditingComment(null)
    setEditText(content)
  }

  const saveEdit = async () => {
    await onSave(editText)
    setEditingComment(null)
  }

  return {
    isEditing,
    editText,
    setEditText,
    startEdit,
    cancelEdit,
    saveEdit,
  }
}
