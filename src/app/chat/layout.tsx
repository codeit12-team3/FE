import ChatLayoutClient from '@/features/chat/components/ChatLayoutClient/ChatLayoutClient'

export default function ChatLayout({
  children,
  chatRoom,
}: {
  children: React.ReactNode
  chatRoom: React.ReactNode
}) {
  return <ChatLayoutClient sidebar={children} chatRoom={chatRoom} />
}
