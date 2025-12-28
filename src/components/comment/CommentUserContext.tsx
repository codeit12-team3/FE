'use client'

import { useSession } from 'next-auth/react'
import { createContext, useContext } from 'react'

interface CommentUserContextType {
  currentUserId: number | null
  checkIsOwner: (memberId: number) => boolean
}

const CommentUserContext = createContext<CommentUserContextType | null>(null)

export function CommentUserProvider({
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
    <CommentUserContext.Provider value={value}>
      {children}
    </CommentUserContext.Provider>
  )
}

export function useCommentUser() {
  const context = useContext(CommentUserContext)
  if (!context) {
    throw new Error('useCommentUser must be used within a CommentUserProvider')
  }
  return context
}
