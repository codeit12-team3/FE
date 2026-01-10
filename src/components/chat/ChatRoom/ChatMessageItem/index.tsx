import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { cn, formatChatTime, getImageUrl } from '@/lib/common'
import { ChatMessage } from '@/types/chat/chat.type'

import ChatSpeechBubble from '../ChatSpeechBubble'

export default function ChatMessageItem({
  messageItem,
  nextMessage,
}: {
  messageItem: ChatMessage
  nextMessage?: ChatMessage
}) {
  const searchParams = useSearchParams()
  const chatParticipantId = Number(searchParams.get('chatParticipantId'))

  const { senderId, senderImage, senderNickname, message, createdAt } =
    messageItem
  const isMyMessage = senderId === chatParticipantId

  // 시간을 표시할지 결정하는 로직
  const shouldShowTime = () => {
    // 다음 메시지가 없으면 (마지막 메시지) 시간 표시
    if (!nextMessage) return true

    // 다음 메시지 발신자가 다르면 시간 표시
    if (senderId !== nextMessage.senderId) return true

    const currentTime = new Date(createdAt)
    const nextTime = new Date(nextMessage.createdAt)

    // 시간이나 분이 다르면 시간 표시
    return (
      currentTime.getHours() !== nextTime.getHours() ||
      currentTime.getMinutes() !== nextTime.getMinutes()
    )
  }

  return (
    <div
      className={cn(
        'w-full flex items-start gap-2 mb-4',
        isMyMessage ? 'justify-end' : 'justify-start',
      )}
    >
      {!isMyMessage && (
        <div className="w-10 h-10 shrink-0 relative">
          <Image
            src={getImageUrl(senderImage) || '/default-profile.png'}
            alt="유저 이미지"
            fill
            className="rounded-full border border-black/5 object-cover"
          />
        </div>
      )}

      <div
        className={cn(
          'flex flex-col gap-1 text-xs',
          isMyMessage ? 'items-end' : 'items-start',
        )}
      >
        {!isMyMessage && (
          <span className="font-medium text-gray-600 ml-1">
            {senderNickname}
          </span>
        )}

        <div
          className={cn(
            'flex items-end gap-2',
            isMyMessage ? 'flex-row-reverse' : 'flex-row',
          )}
        >
          <ChatSpeechBubble senderId={senderId} message={message} />

          {shouldShowTime() && (
            <span className="text-[10px] text-gray-400 shrink-0 mb-1">
              {formatChatTime(createdAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
