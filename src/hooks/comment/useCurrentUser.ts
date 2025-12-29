'use client'

import { useSession } from 'next-auth/react'

export function useCurrentUser() {
  const { data: session } = useSession()

  const currentUserId = session?.user?.memberId
    ? Number(session.user.memberId)
    : null

  const checkIsOwner = (targetMemberId: number) => {
    if (!currentUserId) return false
    return currentUserId === targetMemberId
  }

  return { currentUserId, checkIsOwner }
}
