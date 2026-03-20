import { useCommentInteractionStore } from './useCommentInteractionStore'

beforeEach(() => {
  useCommentInteractionStore.setState({
    mode: null,
    activeCommentId: null,
  })
})

describe('activate', () => {
  it('EDIT 모드로 호출하면 activeCommentId와 mode가 업데이트된다', () => {
    useCommentInteractionStore.getState().activate(1, 'EDIT')
    const { mode, activeCommentId } = useCommentInteractionStore.getState()
    expect(activeCommentId).toBe(1)
    expect(mode).toBe('EDIT')
  })
  it('REPLY 모드로 호출하면 activeCommentId와 mode가 업데이트된다', () => {
    useCommentInteractionStore.getState().activate(2, 'REPLY')
    const { mode, activeCommentId } = useCommentInteractionStore.getState()
    expect(activeCommentId).toBe(2)
    expect(mode).toBe('REPLY')
  })
  it('동일한 id + mode로 재호출 시 동일 state 참조를 반환한다 (불필요한 리렌더 방지 — 핵심 로직)', () => {
    useCommentInteractionStore.getState().activate(1, 'EDIT')
    const before = useCommentInteractionStore.getState()
    useCommentInteractionStore.getState().activate(1, 'EDIT')
    const after = useCommentInteractionStore.getState()
    expect(after).toBe(before)
  })
  it('다른 id로 재호출 시 상태가 변경된다', () => {
    useCommentInteractionStore.getState().activate(1, 'EDIT')
    const before = useCommentInteractionStore.getState()
    useCommentInteractionStore.getState().activate(2, 'EDIT')
    const after = useCommentInteractionStore.getState()
    expect(after).not.toBe(before)
  })
  it('동일 id에서 mode만 바꿔 재호출 시 상태가 변경된다', () => {
    useCommentInteractionStore.getState().activate(1, 'EDIT')
    const before = useCommentInteractionStore.getState()
    useCommentInteractionStore.getState().activate(1, 'REPLY')
    const after = useCommentInteractionStore.getState()
    expect(after).not.toBe(before)
  })
})

describe('deactivate', () => {
  it('활성화 후 호출하면 activeCommentId가 null, mode가 null로 초기화된다', () => {
    useCommentInteractionStore.getState().activate(1, 'REPLY')
    useCommentInteractionStore.getState().deactivate()
    const { mode, activeCommentId } = useCommentInteractionStore.getState()
    expect(mode).toBeNull()
    expect(activeCommentId).toBeNull()
  })
})

describe('isEditing', () => {
  it('EDIT 모드로 활성화된 id를 넘기면 true', () => {
    useCommentInteractionStore.getState().activate(1, 'EDIT')
    const result = useCommentInteractionStore.getState().isEditing(1)
    expect(result).toBe(true)
  })
  it('REPLY 모드로 활성화된 같은 id를 넘기면 false', () => {
    useCommentInteractionStore.getState().activate(1, 'REPLY')
    const result = useCommentInteractionStore.getState().isEditing(1)
    expect(result).toBe(false)
  })
  it('EDIT 모드이지만 다른 id를 넘기면 false', () => {
    useCommentInteractionStore.getState().activate(1, 'EDIT')
    const result = useCommentInteractionStore.getState().isEditing(2)
    expect(result).toBe(false)
  })
  it('비활성 상태에서 호출하면 false', () => {
    useCommentInteractionStore.getState().activate(1, 'EDIT')
    useCommentInteractionStore.getState().deactivate()
    const result = useCommentInteractionStore.getState().isEditing(1)
    expect(result).toBe(false)
  })
})

describe('isReplying', () => {
  it('REPLY 모드로 활성화된 id를 넘기면 true', () => {
    useCommentInteractionStore.getState().activate(1, 'REPLY')
    const result = useCommentInteractionStore.getState().isReplying(1)
    expect(result).toBe(true)
  })
  it('EDIT 모드로 활성화된 같은 id를 넘기면 false', () => {
    useCommentInteractionStore.getState().activate(1, 'EDIT')
    const result = useCommentInteractionStore.getState().isReplying(1)
    expect(result).toBe(false)
  })
  it('REPLY 모드이지만 다른 id를 넘기면 false', () => {
    useCommentInteractionStore.getState().activate(1, 'REPLY')
    const result = useCommentInteractionStore.getState().isReplying(2)
    expect(result).toBe(false)
  })
  it('비활성 상태에서 호출하면 false', () => {
    useCommentInteractionStore.getState().activate(1, 'REPLY')
    useCommentInteractionStore.getState().deactivate()
    const result = useCommentInteractionStore.getState().isReplying(1)
    expect(result).toBe(false)
  })
})
