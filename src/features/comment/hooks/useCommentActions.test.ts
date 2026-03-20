import { act, renderHook } from '@testing-library/react'

import { useCommentActions } from './useCommentActions'

const mockMutate = jest.fn()
const mockMutateAsync = jest.fn()

jest.mock('../api', () => ({
  useCommentMutations: jest.fn(() => ({
    updateCommentMutation: {
      mutateAsync: mockMutateAsync,
      isPending: false,
    },
    removeCommentMutation: {
      mutate: mockMutate,
    },
  })),
}))

const { useCommentMutations } = jest.requireMock('../api')

beforeEach(() => {
  jest.clearAllMocks()
  useCommentMutations.mockReturnValue({
    updateCommentMutation: { mutateAsync: mockMutateAsync, isPending: false },
    removeCommentMutation: { mutate: mockMutate },
  })
})

describe('handleDelete', () => {
  it('removeCommentMutation.mutate를 commentId와 parentId로 호출한다', () => {
    const { result } = renderHook(() => useCommentActions(1, 10, 5))

    act(() => {
      result.current.handleDelete()
    })

    expect(mockMutate).toHaveBeenCalledWith({ commentId: 1, parentId: 5 })
  })

  it('parentId 없으면 undefined로 전달된다', () => {
    const { result } = renderHook(() => useCommentActions(1, 10))

    act(() => {
      result.current.handleDelete()
    })

    expect(mockMutate).toHaveBeenCalledWith({
      commentId: 1,
      parentId: undefined,
    })
  })
})

describe('handleSave', () => {
  it('updateCommentMutation.mutateAsync를 commentId와 content로 호출한다', async () => {
    const { result } = renderHook(() => useCommentActions(1, 10))

    await act(async () => {
      await result.current.handleSave('수정된 댓글')
    })

    expect(mockMutateAsync).toHaveBeenCalledWith({
      commentId: 1,
      content: '수정된 댓글',
    })
  })
})

describe('isUpdating', () => {
  it('updateCommentMutation.isPending이 false면 isUpdating도 false다', () => {
    const { result } = renderHook(() => useCommentActions(1, 10))

    expect(result.current.isUpdating).toBe(false)
  })

  it('updateCommentMutation.isPending이 true면 isUpdating도 true다', () => {
    useCommentMutations.mockReturnValue({
      updateCommentMutation: { mutateAsync: mockMutateAsync, isPending: true },
      removeCommentMutation: { mutate: mockMutate },
    })

    const { result } = renderHook(() => useCommentActions(1, 10))

    expect(result.current.isUpdating).toBe(true)
  })
})
