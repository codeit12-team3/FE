import { create } from 'zustand'

import { CommentContent, ReplyContent } from '@/features/comment/types'

export type Node = (CommentContent | ReplyContent) & {
  childrenIds: number[]
}

interface useCommentStoreProps {
  entities: Record<number, Node>
  rootIds: number[]

  setComments: (comments: CommentContent[]) => void
  setReplies: (parentId: number, replies: ReplyContent[]) => void

  updateContent: (id: number, content: string) => void
  removeNode: (id: number, parentId?: number) => void
}

export const useCommentStore = create<useCommentStoreProps>((set) => ({
  entities: {},
  rootIds: [],

  setComments: (comments) =>
    set((state) => {
      const nextEntities = { ...state.entities }
      comments.forEach((comment) => {
        const existingChildren =
          state.entities[comment.commentId]?.childrenIds || []
        nextEntities[comment.commentId] = {
          ...comment,
          childrenIds: existingChildren,
        }
      })
      return {
        entities: nextEntities,
        rootIds: comments.map((c) => c.commentId),
      }
    }),

  setReplies: (parentId, replies) =>
    set((state) => {
      const nextEntities = { ...state.entities }
      replies.forEach((reply) => {
        nextEntities[reply.commentId] = { ...reply, childrenIds: [] }
      })
      if (nextEntities[parentId]) {
        nextEntities[parentId] = {
          ...nextEntities[parentId],
          childrenIds: replies.map((r) => r.commentId),
        }
      }
      return { entities: nextEntities }
    }),

  updateContent: (id, content) =>
    set((state) => {
      if (!state.entities[id]) return state
      return {
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], content },
        },
      }
    }),

  removeNode: (id, parentId) =>
    set((state) => {
      const nextEntities = { ...state.entities }
      delete nextEntities[id]

      if (parentId && nextEntities[parentId]) {
        nextEntities[parentId] = {
          ...nextEntities[parentId],
          childrenIds: nextEntities[parentId].childrenIds.filter(
            (childId) => childId !== id,
          ),
        }
        return { entities: nextEntities }
      }
      return {
        entities: nextEntities,
        rootIds: state.rootIds.filter((rootId) => rootId !== id),
      }
    }),
}))
