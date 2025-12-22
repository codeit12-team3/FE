'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

interface CommentInteractionContextType {
  // 댓글 및 답글 수정 폼
  editingId: number | null
  editText: string
  startEdit: (id: number, text: string) => void
  updateText: (text: string) => void
  cancelEdit: () => void
  isEditing: (id: number) => boolean

  // 답글 작성 폼
  openReplyFormId: number | null
  openReplyForm: (commentId: number) => void
  closeReplyForm: () => void
  isReplyFormOpen: (commentId: number) => boolean
}

const CommentInteractionContext =
  createContext<CommentInteractionContextType | null>(null)

export function CommentInteractionProvider({
  children,
}: {
  children: ReactNode
}) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [openReplyFormId, setOpenReplyFormId] = useState<number | null>(null)

  const startEdit = useCallback((id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
    setOpenReplyFormId(null)
  }, [])

  const cancelEdit = useCallback(() => {
    setEditingId(null)
    setEditText('')
  }, [])

  const isEditing = useCallback((id: number) => editingId === id, [editingId])

  const openReplyForm = useCallback((commentId: number) => {
    setOpenReplyFormId(commentId)
    setEditingId(null)
    setEditText('')
  }, [])

  const closeReplyForm = useCallback(() => {
    setOpenReplyFormId(null)
  }, [])

  const isReplyFormOpen = useCallback(
    (commentId: number) => openReplyFormId === commentId,
    [openReplyFormId],
  )

  return (
    <CommentInteractionContext.Provider
      value={{
        editingId,
        editText,
        startEdit,
        updateText: setEditText,
        cancelEdit,
        isEditing,
        openReplyFormId,
        openReplyForm,
        closeReplyForm,
        isReplyFormOpen,
      }}
    >
      {children}
    </CommentInteractionContext.Provider>
  )
}

export const useCommentInteraction = () => {
  const context = useContext(CommentInteractionContext)
  if (!context) {
    throw new Error(
      'useCommentInteraction은 CommentInteractionProvider 내부에서만 사용할 수 있습니다.',
    )
  }
  return context
}
