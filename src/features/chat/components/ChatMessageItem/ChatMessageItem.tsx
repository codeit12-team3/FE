import Image from 'next/image'

import { ChatMessage } from '@/features/chat/types/chat.type'
import { cn, formatChatTime, getImageUrl } from '@/lib/common'

import ChatSpeechBubble from '../ChatSpeechBubble/ChatSpeechBubble'

export default function ChatMessageItem({
  messageItem,
  isMyMessage,
  showProfile,
  showTime,
}: {
  messageItem: ChatMessage
  isMyMessage: boolean
  showProfile: boolean
  showTime: boolean
}) {
  const { senderId, senderImage, senderNickname, message, createdAt } =
    messageItem

  return (
    <div
      className={cn(
        'w-full flex items-start gap-2 mb-4',
        isMyMessage ? 'justify-end' : 'justify-start',
      )}
    >
      {!isMyMessage && (
        <div className="w-10 h-10 shrink-0 relative">
          {showProfile && (
            <Image
              src={getImageUrl(senderImage) || '/default-profile.png'}
              alt="유저 이미지"
              fill
              className="rounded-full border border-black/5 object-cover"
            />
          )}
        </div>
      )}

      <div
        className={cn(
          'flex flex-col gap-1 text-xs',
          isMyMessage ? 'items-end' : 'items-start',
        )}
      >
        {!isMyMessage && showProfile && (
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

          {showTime && (
            <span className="text-[10px] text-gray-400 shrink-0 mb-1">
              {formatChatTime(createdAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
