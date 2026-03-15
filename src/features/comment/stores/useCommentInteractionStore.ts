import { create } from 'zustand'

type InteractionMode = 'EDIT' | 'REPLY' | null

interface CommentInteractionStore {
  activeCommentId: number | null
  mode: InteractionMode
  activate: (id: number, mode: Exclude<InteractionMode, null>) => void
  deactivate: () => void
  isEditing: (id: number) => boolean
  isReplying: (id: number) => boolean
}

export const useCommentInteractionStore = create<CommentInteractionStore>(
  (set, get) => ({
    activeCommentId: null,
    mode: null,
    activate: (id, mode) =>
      set((state) => {
        if (state.activeCommentId === id && state.mode === mode) return state
        return { activeCommentId: id, mode }
      }),
    deactivate: () => set({ activeCommentId: null, mode: null }),
    isEditing: (id) => {
      const { activeCommentId, mode } = get()
      return activeCommentId === id && mode === 'EDIT'
    },
    isReplying: (id) => {
      const { activeCommentId, mode } = get()
      return activeCommentId === id && mode === 'REPLY'
    },
  }),
)
