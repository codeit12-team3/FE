import { create } from 'zustand'

type InteractionMode = 'EDIT' | 'REPLY' | null

interface CommentInteractionStore {
  activeId: number | null
  mode: InteractionMode

  // 열기
  open: (id: number, mode: Exclude<InteractionMode, null>) => void

  // 닫기
  close: () => void

  // ID가 수정 중인지 확인
  isEditing: (id: number) => boolean

  // 특정 ID에 답글 작성 중인지 확인
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
