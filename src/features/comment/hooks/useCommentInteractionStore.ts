import { create } from 'zustand'

type InteractionMode = 'EDIT' | 'REPLY' | null

interface CommentInteractionStore {
  activeId: number | null
  mode: InteractionMode
  open: (id: number, mode: Exclude<InteractionMode, null>) => void
  close: () => void
  isEditing: (id: number) => boolean
  isReplying: (id: number) => boolean
}

export const useCommentInteractionStore = create<CommentInteractionStore>(
  (set, get) => ({
    activeId: null,
    mode: null,
    open: (id, mode) => set({ activeId: id, mode }),
    close: () => set({ activeId: null, mode: null }),
    isEditing: (id) => get().activeId === id && get().mode === 'EDIT',
    isReplying: (id) => get().activeId === id && get().mode === 'REPLY',
  }),
)
