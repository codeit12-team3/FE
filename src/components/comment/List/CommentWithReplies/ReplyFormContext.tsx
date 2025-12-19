import { createContext, ReactNode, useContext, useState } from 'react'

interface ReplyFormContextType {
  openReplyFormId: number | null
  openReplyForm: (commentId: number) => void
  closeReplyForm: () => void
  isReplyFormOpen: (commentId: number) => boolean
}

const ReplyFormContext = createContext<ReplyFormContextType | undefined>(
  undefined,
)

export function ReplyFormProvider({ children }: { children: ReactNode }) {
  const [openReplyFormId, setOpenReplyFormId] = useState<number | null>(null)

  const openReplyForm = (commentId: number) => {
    setOpenReplyFormId(commentId)
  }

  const closeReplyForm = () => {
    setOpenReplyFormId(null)
  }

  const isReplyFormOpen = (commentId: number) => {
    return openReplyFormId === commentId
  }

  return (
    <ReplyFormContext.Provider
      value={{
        openReplyFormId,
        openReplyForm,
        closeReplyForm,
        isReplyFormOpen,
      }}
    >
      {children}
    </ReplyFormContext.Provider>
  )
}

export function useReplyForm() {
  const context = useContext(ReplyFormContext)
  if (context === undefined) {
    throw new Error('useReplyForm must be used within a ReplyFormProvider')
  }
  return context
}
