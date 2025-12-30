import Image from 'next/image'

import ChatSpeechBubble from '../ChatSpeechBubble'

export default function ChatMessageItem({
  senderImage,
  senderNickname,
  message,
  senderId,
  createdAt,
}: {
  senderImage: string
  senderNickname: string
  messageId: number
  message: string
  senderId: number
  createdAt: string
}) {
  return (
    <div className="flex items-start gap-2">
      <Image
        src={senderImage}
        alt="유저 이미지"
        width={40}
        height={40}
        className="rounded-full border border-black/5"
      />
      <div className="flex flex-col gap-2 items-start justify-start text-xs">
        <span className="font-medium">{senderNickname}</span>
        <div className="flex items-end gap-2">
          <ChatSpeechBubble senderId={senderId} message={message} />
          <span>{createdAt}</span>
        </div>
      </div>
    </div>
  )
}
