import { act, renderHook } from '@testing-library/react'

import { useReplyActions } from './useReplyActions'

const mockMutate = jest.fn()
const mockMutateAsync = jest.fn()

jest.mock('../api', () => ({
  useReplyMutations: jest.fn(() => ({
    updateReplyMutation: {
      mutateAsync: mockMutateAsync,
      isPending: false,
    },
    removeReplyMutation: {
      mutate: mockMutate,
    },
  })),
}))

const { useReplyMutations } = jest.requireMock('../api')

beforeEach(() => {
  jest.clearAllMocks()
  useReplyMutations.mockReturnValue({
    updateReplyMutation: { mutateAsync: mockMutateAsync, isPending: false },
    removeReplyMutation: { mutate: mockMutate },
  })
})

describe('handleDelete', () => {
  it('removeReplyMutation.mutate를 commentId로 호출한다', () => {
    const { result } = renderHook(() => useReplyActions(11, 10, 1))

    act(() => {
      result.current.handleDelete()
    })

    expect(mockMutate).toHaveBeenCalledWith({ commentId: 11 })
  })

  it('parentId는 mutate 인자에 포함되지 않는다', () => {
    const { result } = renderHook(() => useReplyActions(11, 10, 1))

    act(() => {
      result.current.handleDelete()
    })

    expect(mockMutate).not.toHaveBeenCalledWith(
      expect.objectContaining({ parentId: expect.anything() }),
    )
  })
})

describe('handleSave', () => {
  it('updateReplyMutation.mutateAsync를 commentId와 content로 호출한다', async () => {
    const { result } = renderHook(() => useReplyActions(11, 10, 1))

    await act(async () => {
      await result.current.handleSave('수정된 답글')
    })

    expect(mockMutateAsync).toHaveBeenCalledWith({
      commentId: 11,
      content: '수정된 답글',
    })
  })
})

describe('isUpdating', () => {
  it('updateReplyMutation.isPending이 false면 isUpdating도 false다', () => {
    const { result } = renderHook(() => useReplyActions(11, 10, 1))

    expect(result.current.isUpdating).toBe(false)
  })

  it('updateReplyMutation.isPending이 true면 isUpdating도 true다', () => {
    useReplyMutations.mockReturnValue({
      updateReplyMutation: { mutateAsync: mockMutateAsync, isPending: true },
      removeReplyMutation: { mutate: mockMutate },
    })

    const { result } = renderHook(() => useReplyActions(11, 10, 1))

    expect(result.current.isUpdating).toBe(true)
  })
})
