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

// 같은 내용의 배열이 다른 참조로 들어와도 리렌더를 막기 위한 동등 비교
function arrayEqual(a: readonly number[], b: readonly number[]) {
  if (a === b) return true
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

// 배열 내용이 같으면 이전 참조를 그대로 반환해 Zustand 셀렉터의 불필요한 리렌더를 방지
function getStableArray(prev: number[], next: number[]): number[] {
  return arrayEqual(prev, next) ? prev : next
}

// childrenIds를 제외한 나머지 필드가 동일한지 얕은 비교
// 서버에서 동일한 데이터가 다시 오더라도 엔티티 객체를 재생성하지 않기 위해 사용
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

// 서버에서 받은 댓글, 답글 목록을 기존 엔티티에 병합
// 변경이 없는 노드는 이전 참조를 유지
function mergeIncomingEntities<T extends Comment | Reply>(
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

// 댓글 엔티티의 childrenIds만 업데이트
// 내용이 같으면 entities 객체 자체도 동일 참조를 반환해 불필요한 리렌더 방지
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
  // childrenIds가 실제로 변경되지 않았으면 entities 참조 자체를 유지
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

// 댓글/답글 삭제 시 트리 구조를 유지하며 노드를 제거하는 함수
function cascadeRemoveNode(
  entities: Record<number, CommentEntity>,
  rootIds: number[],
  id: number,
  parentId?: number,
): { entities: Record<number, CommentEntity>; rootIds: number[] } {
  const node = entities[id]
  if (!node) return { entities, rootIds }

  const hasChildren = node.childrenIds.length > 0

  // 댓글 삭제 시, 답글이 있으면 "삭제된 댓글"로 표시, 트리 구조는 유지
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
      const nextChildrenIds = parent.childrenIds.filter(
        (childrenId) => childrenId !== id,
      )
      nextEntities[parentId] = { ...parent, childrenIds: nextChildrenIds }

      // 마지막 답글이 삭제되고 댓글도 이미 삭제된 상태("삭제된 댓글"로 표시된 상태)면 댓글까지 제거
      if (nextEntities[parentId].deleted && nextChildrenIds.length === 0) {
        return cascadeRemoveNode(nextEntities, nextRootIds, parentId, undefined)
      }
    }
  } else {
    nextRootIds = rootIds.filter((rootId) => rootId !== id)
  }

  return { entities: nextEntities, rootIds: nextRootIds }
}

export const useCommentStore = create<CommentStoreState>((set) => ({
  entities: {},
  rootIds: [],

  setComments: (comments) =>
    set((state) => {
      const nextEntities = mergeIncomingEntities<Comment>(
        state.entities,
        comments,
      )
      const nextRootIds = comments.map((comment) => comment.commentId)
      const rootIds = getStableArray(state.rootIds, nextRootIds)
      return {
        entities: nextEntities,
        rootIds,
      }
    }),

  setReplies: (parentId, replies) =>
    set((state) => {
      const mergedEntities = mergeIncomingEntities<Reply>(
        state.entities,
        replies,
      )
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
