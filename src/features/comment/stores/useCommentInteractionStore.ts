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
        // 동일한 id와 mode로 재호출 시 동일 참조를 반환해 불필요한 리렌더 방지
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
