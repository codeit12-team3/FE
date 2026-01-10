'use client'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/common'

export default function ChatSpeechBubble({
  senderId,
  message,
}: {
  senderId: number
  message: string
}) {
  const searchParams = useSearchParams()
  const chatParticipantId = Number(searchParams.get('chatParticipantId'))

  const isMyMessage = senderId === chatParticipantId

  return (
    <div
      className={cn(
        'rounded-2xl p-3 max-w-[280px] md:max-w-[456px] whitespace-pre-wrap wrap-break-word text-sm leading-relaxed shadow-sm',
        isMyMessage
          ? 'bg-blue-500 text-white rounded-tr-none'
          : 'bg-white text-gray-800 rounded-tl-none',
      )}
    >
      {message}
    </div>
  )
}
