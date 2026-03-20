import { mockComments, mockReplies } from '@/mocks/handlers/comments'

import { useCommentStore } from './useCommentStore'

beforeEach(() => {
  useCommentStore.setState({ entities: {}, rootIds: [] })
})

describe('setComments', () => {
  it('댓글 배열을 entities로 정규화한다', () => {
    useCommentStore.getState().setComments(mockComments)

    const { entities, rootIds } = useCommentStore.getState()

    expect(entities[1].content).toBe(
      'Zustand로 상태 관리하는 게 정말 편리하네요! 좋은 정보 감사합니다.',
    )
    expect(rootIds[0]).toBe(1)
  })

  it('동일 데이터 재입력 시 엔티티 참조가 유지된다', () => {
    useCommentStore.getState().setComments(mockComments)
    const before = useCommentStore.getState().entities[1]

    useCommentStore.getState().setComments(mockComments)
    const after = useCommentStore.getState().entities[1]

    expect(after).toBe(before)
  })
})

describe('setReplies', () => {
  it('답글이 부모의 childrenIds에 연결된다', () => {
    useCommentStore.getState().setComments(mockComments)
    useCommentStore.getState().setReplies(
      1,
      mockReplies.filter((r) => r.parentId === 1),
    )

    const { entities } = useCommentStore.getState()

    expect(entities[1].childrenIds).toContain(11)
    expect(entities[1].childrenIds).toContain(12)
  })
})

describe('updateContent', () => {
  it('해당 id의 content가 업데이트된다', () => {
    useCommentStore.getState().setComments(mockComments)
    useCommentStore.getState().updateContent(1, '수정했습니다')

    const after = useCommentStore.getState().entities[1].content

    expect(after).toBe('수정했습니다')
  })

  it('존재하지 않는 id는 상태가 변하지 않는다', () => {
    useCommentStore.getState().setComments(mockComments)
    const before = useCommentStore.getState().entities

    useCommentStore.getState().updateContent(9999, '수정했습니다')
    const after = useCommentStore.getState().entities

    expect(after).toBe(before)
  })
})

describe('removeCommentEntity', () => {
  it('답글 없는 댓글 삭제 → entities에서 제거, rootIds에서 제거', () => {
    useCommentStore.getState().setComments(mockComments)
    useCommentStore.getState().removeCommentEntity(4)

    const { entities, rootIds } = useCommentStore.getState()

    expect(entities[4]).toBeUndefined()
    expect(rootIds).not.toContain(4)
  })

  it('답글 있는 댓글 삭제 → deleted: true 소프트 삭제, rootIds 유지', () => {
    useCommentStore.getState().setComments(mockComments)
    useCommentStore.getState().setReplies(
      1,
      mockReplies.filter((r) => r.parentId === 1),
    )
    useCommentStore.getState().removeCommentEntity(1)

    const { entities, rootIds } = useCommentStore.getState()

    expect(entities[1].deleted).toBe(true)
    expect(entities[1].childrenIds).toContain(11)
    expect(entities[1].childrenIds).toContain(12)
    expect(rootIds).toContain(1)
  })

  it('답글 삭제 → entities에서 제거, 부모 childrenIds에서 제거', () => {
    useCommentStore.getState().setComments(mockComments)
    useCommentStore.getState().setReplies(
      1,
      mockReplies.filter((r) => r.parentId === 1),
    )
    useCommentStore.getState().removeCommentEntity(11, 1)

    const { entities } = useCommentStore.getState()

    expect(entities[11]).toBeUndefined()
    expect(entities[1].childrenIds).not.toContain(11)
  })

  it('마지막 답글 삭제 + 부모가 이미 deleted → 부모까지 연쇄 제거', () => {
    useCommentStore.getState().setComments(mockComments)
    useCommentStore.getState().setReplies(
      2,
      mockReplies.filter((r) => r.parentId === 2),
    )
    useCommentStore.getState().removeCommentEntity(2)
    useCommentStore.getState().removeCommentEntity(15, 2)

    const { entities, rootIds } = useCommentStore.getState()

    expect(entities[2]).toBeUndefined()
    expect(entities[15]).toBeUndefined()
    expect(rootIds).not.toContain(2)
  })
})
