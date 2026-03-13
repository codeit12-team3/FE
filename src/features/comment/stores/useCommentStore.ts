import { create } from 'zustand'

import { Comment, Reply } from '@/features/comment/types'

export type CommentNode = (Comment | Reply) & {
  childrenIds: number[]
}

interface CommentStoreState {
  entities: Record<number, CommentNode>
  rootIds: number[]
  setComments: (comments: Comment[]) => void
  setReplies: (parentId: number, replies: Reply[]) => void
  updateContent: (id: number, content: string) => void
  removeCommentNode: (id: number, parentId?: number) => void
}

function arrayEqual(a: readonly number[], b: readonly number[]) {
  if (a === b) return true
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

function getStableArray(prev: readonly number[], next: readonly number[]) {
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
  prevEntities: Record<number, CommentNode>,
  items: T[],
) {
  const nextEntities: Record<number, CommentNode> = { ...prevEntities }
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
  entities: Record<number, CommentNode>,
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

function removeChildId(
  entities: Record<number, CommentNode>,
  parentId: number,
  childId: number,
) {
  const parentPrev = entities[parentId]
  if (!parentPrev) return entities
  const nextChildrenIds = parentPrev.childrenIds.filter((id) => id !== childId)
  if (arrayEqual(parentPrev.childrenIds, nextChildrenIds)) {
    return entities
  }
  return {
    ...entities,
    [parentId]: {
      ...parentPrev,
      childrenIds: nextChildrenIds,
    },
  }
}

function collectSubtreeIds(
  entities: Record<number, CommentNode>,
  id: number,
  visited = new Set<number>(),
): number[] {
  const node = entities[id]
  if (!node) return []
  if (visited.has(id)) {
    return []
  }
  visited.add(id)
  const ids = [id]
  for (const childId of node.childrenIds) {
    ids.push(...collectSubtreeIds(entities, childId, visited))
  }

  return ids
}

function removeNodesFromEntities(
  entities: Record<number, CommentNode>,
  idsToRemove: readonly number[],
) {
  if (idsToRemove.length === 0) return entities

  const nextEntities: Record<number, CommentNode> = { ...entities }

  for (const id of idsToRemove) {
    delete nextEntities[id]
  }

  return nextEntities
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
        rootIds: [...rootIds],
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

  removeCommentNode: (id, parentId) =>
    set((state) => {
      const targetNode = state.entities[id]
      if (!targetNode) return state
      const subtreeIds = collectSubtreeIds(state.entities, id)
      let nextEntities = removeNodesFromEntities(state.entities, subtreeIds)
      if (parentId != null) {
        nextEntities = removeChildId(nextEntities, parentId, id)
        return {
          entities: nextEntities,
        }
      }
      const nextRootIds = state.rootIds.filter((rootId) => rootId !== id)
      const rootIds = getStableArray(state.rootIds, nextRootIds)
      return {
        entities: nextEntities,
        rootIds: [...rootIds],
      }
    }),
}))
