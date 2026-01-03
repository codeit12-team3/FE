// app/chat/layout.tsx
import ChatLayoutClient from '@/components/chat/ChatLayoutClient'

export default function ChatLayout({
  children,
  chatRoom,
}: {
  children: React.ReactNode
  chatRoom: React.ReactNode
}) {
  return <ChatLayoutClient sidebar={children} chatRoom={chatRoom} />
}
