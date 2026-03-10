import { create } from 'zustand'

import { Comment, Reply } from '@/features/comment/types'

export type Node = (Comment | Reply) & {
  childrenIds: number[]
}

interface useCommentStoreProps {
  entities: Record<number, Node>
  rootIds: number[]

  setComments: (comments: Comment[]) => void
  setReplies: (parentId: number, replies: Reply[]) => void

  updateContent: (id: number, content: string) => void
  removeNode: (id: number, parentId?: number) => void
}

function arrayEqual(a: readonly number[], b: readonly number[]) {
  if (a === b) return true
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

function sameIncoming<T extends object>(
  prev: (T & { childrenIds: number[] }) | undefined,
  incoming: T,
) {
  if (!prev) return false
  const keys = Object.keys(incoming) as Array<keyof T>
  for (const k of keys) {
    if (prev[k] !== incoming[k]) return false
  }
  return true
}

export const useCommentStore = create<useCommentStoreProps>((set) => ({
  entities: {},
  rootIds: [],

  setComments: (comments) =>
    set((state) => {
      const nextEntities: Record<number, Node> = { ...state.entities }

      for (const comment of comments) {
        const id = comment.commentId
        const prevNode = state.entities[id]

        const prevAsComment = prevNode as
          | (Comment & { childrenIds: number[] })
          | undefined
        const childrenIds = prevNode?.childrenIds ?? []

        if (sameIncoming<Comment>(prevAsComment, comment)) {
          nextEntities[id] = prevNode
          continue
        }

        nextEntities[id] = {
          ...comment,
          childrenIds,
        }
      }

      const nextRootIds = comments.map((c) => c.commentId)
      const rootIds = arrayEqual(state.rootIds, nextRootIds)
        ? state.rootIds
        : nextRootIds

      return {
        entities: nextEntities,
        rootIds,
      }
    }),

  setReplies: (parentId, replies) =>
    set((state) => {
      const nextEntities: Record<number, Node> = { ...state.entities }

      for (const reply of replies) {
        const id = reply.commentId
        const prevNode = state.entities[id]

        const prevAsReply = prevNode as
          | (Reply & { childrenIds: number[] })
          | undefined
        const childrenIds = prevNode?.childrenIds ?? []

        if (sameIncoming<Reply>(prevAsReply, reply)) {
          nextEntities[id] = prevNode
          continue
        }

        nextEntities[id] = { ...reply, childrenIds }
      }

      const parentPrev = state.entities[parentId]
      if (parentPrev) {
        const nextChildren = replies.map((r) => r.commentId)
        const prevChildren = parentPrev.childrenIds

        if (arrayEqual(prevChildren, nextChildren)) {
          nextEntities[parentId] = parentPrev
        } else {
          nextEntities[parentId] = {
            ...parentPrev,
            childrenIds: nextChildren,
          }
        }
      }

      return { entities: nextEntities }
    }),

  updateContent: (id, content) =>
    set((state) => {
      const prev = state.entities[id]
      if (!prev) return state
      if (prev.content === content) return state

      return {
        entities: {
          ...state.entities,
          [id]: { ...prev, content },
        },
      }
    }),

  removeNode: (id, parentId) =>
    set((state) => {
      if (!state.entities[id]) return state

      const nextEntities: Record<number, Node> = { ...state.entities }
      delete nextEntities[id]

      if (parentId) {
        const parentPrev = nextEntities[parentId]
        if (parentPrev) {
          const nextChildren = parentPrev.childrenIds.filter(
            (childId) => childId !== id,
          )

          if (arrayEqual(parentPrev.childrenIds, nextChildren)) {
            return { entities: nextEntities }
          }

          nextEntities[parentId] = { ...parentPrev, childrenIds: nextChildren }
          return { entities: nextEntities }
        }
      }

      const nextRootIds = state.rootIds.filter((rootId) => rootId !== id)
      return {
        entities: nextEntities,
        rootIds: arrayEqual(state.rootIds, nextRootIds)
          ? state.rootIds
          : nextRootIds,
      }
    }),
}))
