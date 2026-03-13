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
    open: (id, mode) =>
      set((state) => {
        if (state.activeId === id && state.mode === mode) return state
        return { activeId: id, mode }
      }),
    close: () => set({ activeId: null, mode: null }),
    isEditing: (id) => {
      const { activeId, mode } = get()
      return activeId === id && mode === 'EDIT'
    },
    isReplying: (id) => {
      const { activeId, mode } = get()
      return activeId === id && mode === 'REPLY'
    },
  }),
)
