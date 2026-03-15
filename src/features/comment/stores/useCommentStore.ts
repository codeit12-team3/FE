import { create } from 'zustand'

import { Comment, Reply } from '@/features/comment/types'

export type CommentEntity = (Comment | Reply) & {
  childrenIds: number[]
  deleted?: boolean
}

interface CommentStoreState {
  entities: Record<number, CommentEntity>
  rootIds: number[]
  setComments: (comments: Comment[]) => void
  setReplies: (parentId: number, replies: Reply[]) => void
  updateContent: (id: number, content: string) => void
  removeCommentEntity: (id: number, parentId?: number) => void
}

function arrayEqual(a: readonly number[], b: readonly number[]) {
  if (a === b) return true
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

function getStableArray(prev: number[], next: number[]): number[] {
  return arrayEqual(prev, next) ? prev : next
}

function sameIncoming<T extends object>(
  prev: (T & { childrenIds: number[] }) | undefined,
  incoming: T,
) {
  if (!prev) return false
  const keys = Object.keys(incoming) as Array<keyof T>
  for (const key of keys) {
    if (prev[key] !== incoming[key]) return false
  }
  return true
}

function mergeIncomingNodes<T extends Comment | Reply>(
  prevEntities: Record<number, CommentEntity>,
  items: T[],
) {
  const nextEntities: Record<number, CommentEntity> = { ...prevEntities }
  for (const item of items) {
    const id = item.commentId
    const prevNode = prevEntities[id]
    const prevTypedNode = prevNode as
      | (T & { childrenIds: number[] })
      | undefined
    const childrenIds = prevNode?.childrenIds ?? []
    if (sameIncoming<T>(prevTypedNode, item)) {
      if (prevNode) {
        nextEntities[id] = prevNode
      }
      continue
    }
    nextEntities[id] = {
      ...item,
      childrenIds,
    }
  }
  return nextEntities
}

function replaceChildrenIds(
  entities: Record<number, CommentEntity>,
  parentId: number,
  nextChildrenIds: number[],
) {
  const parentPrev = entities[parentId]
  if (!parentPrev) return entities
  const stableChildrenIds = getStableArray(
    parentPrev.childrenIds,
    nextChildrenIds,
  )
  if (stableChildrenIds === parentPrev.childrenIds) {
    return entities
  }
  return {
    ...entities,
    [parentId]: {
      ...parentPrev,
      childrenIds: [...stableChildrenIds],
    },
  }
}

function cascadeRemoveNode(
  entities: Record<number, CommentEntity>,
  rootIds: number[],
  id: number,
  parentId?: number,
): { entities: Record<number, CommentEntity>; rootIds: number[] } {
  const node = entities[id]
  if (!node) return { entities, rootIds }

  const hasChildren = node.childrenIds.length > 0

  if (hasChildren) {
    return {
      entities: {
        ...entities,
        [id]: { ...node, deleted: true },
      },
      rootIds,
    }
  }

  const nextEntities: Record<number, CommentEntity> = { ...entities }
  delete nextEntities[id]

  let nextRootIds = rootIds

  if (parentId != null) {
    const parent = nextEntities[parentId]
    if (parent) {
      const nextChildrenIds = parent.childrenIds.filter((cId) => cId !== id)
      nextEntities[parentId] = { ...parent, childrenIds: nextChildrenIds }

      if (nextEntities[parentId].deleted && nextChildrenIds.length === 0) {
        const grandParentId =
          'parentId' in parent ? (parent as Reply).parentId : undefined
        return cascadeRemoveNode(
          nextEntities,
          nextRootIds,
          parentId,
          grandParentId as number | undefined,
        )
      }
    }
  } else {
    nextRootIds = rootIds.filter((rId) => rId !== id)
  }

  return { entities: nextEntities, rootIds: nextRootIds }
}

export const useCommentStore = create<CommentStoreState>((set) => ({
  entities: {},
  rootIds: [],

  setComments: (comments) =>
    set((state) => {
      const nextEntities = mergeIncomingNodes<Comment>(state.entities, comments)
      const nextRootIds = comments.map((comment) => comment.commentId)
      const rootIds = getStableArray(state.rootIds, nextRootIds)
      return {
        entities: nextEntities,
        rootIds,
      }
    }),

  setReplies: (parentId, replies) =>
    set((state) => {
      const mergedEntities = mergeIncomingNodes<Reply>(state.entities, replies)
      const nextChildrenIds = replies.map((reply) => reply.commentId)
      const nextEntities = replaceChildrenIds(
        mergedEntities,
        parentId,
        nextChildrenIds,
      )
      return { entities: nextEntities }
    }),

  updateContent: (id, content) =>
    set((state) => {
      const prevNode = state.entities[id]
      if (!prevNode) return state
      if (prevNode.content === content) return state
      return {
        entities: {
          ...state.entities,
          [id]: {
            ...prevNode,
            content,
          },
        },
      }
    }),

  removeCommentEntity: (id, parentId) =>
    set((state) => {
      const targetNode = state.entities[id]
      if (!targetNode) return state

      const { entities, rootIds } = cascadeRemoveNode(
        state.entities,
        state.rootIds,
        id,
        parentId,
      )

      return { entities, rootIds }
    }),
}))
