'use client'

import { useSession } from 'next-auth/react'
import { createContext, useContext } from 'react'

interface CurrentUserContextType {
  currentUserId: number | null
  checkIsOwner: (memberId: number) => boolean
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null)

export default function CurrentUserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()

  const currentUserId = session?.user?.memberId
    ? Number(session.user.memberId)
    : null

  const value = {
    currentUserId,
    checkIsOwner: (targetMemberId: number) => {
      if (!currentUserId) return false
      return currentUserId === targetMemberId
    },
  }

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export function useCurrentUser() {
  const context = useContext(CurrentUserContext)
  if (!context) {
    throw new Error('useCommentUser must be used within a CommentUserProvider')
  }
  return context
}
