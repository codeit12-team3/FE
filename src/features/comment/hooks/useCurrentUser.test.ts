import { renderHook } from '@testing-library/react'
import { useSession } from 'next-auth/react'

import { useCurrentUser } from './useCurrentUser'

const mockUseSession = useSession as jest.Mock

describe('checkIsOwner', () => {
  it('세션이 없을 때 false를 반환한다', () => {
    mockUseSession.mockReturnValue({
      data: null,
    })
    const { result } = renderHook(() => useCurrentUser())
    expect(result.current.checkIsOwner(1)).toBe(false)
  })
  it('currentUserId와 targetMemberId가 같으면 true를 반환한다', () => {
    mockUseSession.mockReturnValue({
      data: { user: { memberId: '1' } },
    })
    const { result } = renderHook(() => useCurrentUser())
    expect(result.current.checkIsOwner(1)).toBe(true)
  })
  it('currentUserId와 targetMemberId가 다르면 false를 반환한다', () => {
    mockUseSession.mockReturnValue({
      data: { user: { memberId: '1' } },
    })
    const { result } = renderHook(() => useCurrentUser())
    expect(result.current.checkIsOwner(2)).toBe(false)
  })
})

describe('currentUserId', () => {
  it('세션이 있으면 memberId를 숫자로 반환한다', () => {
    mockUseSession.mockReturnValue({
      data: { user: { memberId: '1' } },
    })
    const { result } = renderHook(() => useCurrentUser())
    expect(result.current.currentUserId).toEqual(1)
  })
  it('세션이 없으면 null을 반환한다', () => {
    mockUseSession.mockReturnValue({
      data: null,
    })
    const { result } = renderHook(() => useCurrentUser())
    expect(result.current.currentUserId).toBeNull()
  })
})
