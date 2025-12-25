import { create } from 'zustand'

type EditingStore = {
  editingCommentId: number | null
  setEditingComment: (id: number | null) => void
}

export const useEditingStore = create<EditingStore>((set) => ({
  editingCommentId: null,
  setEditingComment: (id) => set({ editingCommentId: id }),
}))
