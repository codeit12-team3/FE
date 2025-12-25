import { create } from 'zustand'

type ReplyingStore = {
  replyingToCommentId: number | null
  setReplyingToComment: (id: number | null) => void
}

export const useReplyingStore = create<ReplyingStore>((set) => ({
  replyingToCommentId: null,
  setReplyingToComment: (id) => set({ replyingToCommentId: id }),
}))
