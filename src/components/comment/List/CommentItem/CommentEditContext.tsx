'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface CommentEditContextType {
  editingId: number | null
  editText: string
  startEdit: (id: number, text: string) => void
  updateText: (text: string) => void
  cancelEdit: () => void
  isEditing: (id: number) => boolean
}

const CommentEditContext = createContext<CommentEditContextType | null>(null)

export function CommentEditProvider({ children }: { children: ReactNode }) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const startEdit = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const isEditing = (id: number) => editingId === id

  return (
    <CommentEditContext.Provider
      value={{
        editingId,
        editText,
        startEdit,
        updateText: setEditText,
        cancelEdit,
        isEditing,
      }}
    >
      {children}
    </CommentEditContext.Provider>
  )
}

export const useCommentEdit = () => {
  const context = useContext(CommentEditContext)
  if (!context)
    throw new Error('useCommentEdit must be used within CommentEditProvider')
  return context
}
