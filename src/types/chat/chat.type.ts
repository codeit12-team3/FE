export type MessageType = 'CHAT' | 'SYSTEM'

export interface ChatMessage {
  messageId: number
  chatRoomId: number
  senderId: number
  senderNickname: string
  senderImage: string | null
  messageType: MessageType
  message: string
  createdAt: string
}
export interface ChatPage {
  size: number
  number: number
  totalElements: number
  totalPages: number
}
export interface ChatType {
  content: ChatMessage[]
  page: ChatPage
}
