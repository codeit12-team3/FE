import { useSession } from 'next-auth/react'

import { cn } from '@/lib/common'

export default function ChatSpeechBubble({
  senderId,
  message,
}: {
  senderId: number
  message: string
}) {
  const { data: session } = useSession()
  const currentUserId = session?.user.id
  const isMyMessage = senderId === currentUserId
  return (
    <div
      className={cn(
        'rounded-xl p-4 max-w-[456px] whitespace-pre-wrap wrap-break-word',
        isMyMessage
          ? 'bg-blue-500 text-white rounded-tr-none'
          : 'bg-gray-200 text-gray-800 rounded-tl-none',
      )}
    >
      {message}
    </div>
  )
}
