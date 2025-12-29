export type RecruitStatus = 'RECRUITING' | 'CLOSED' | 'COMPLETED'

export interface ChatRoomContent {
  chatRoomId: number
  chatParticipantId: number
  unreadCount: number
  title: string
  thumbnail: string | null
  tags: string[]
  nation: string
  region: string
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
  recruitStatus: RecruitStatus
  lastMessage: string
  lastMessageAt: string // YYYY-MM-DD HH:mm:ss
}
export interface ChatRoomPage {
  size: number
  number: number
  totalElements: number
  totalPages: number
}
export interface ChatRoomType {
  content: ChatRoomContent[]
  page: ChatRoomPage
}
export interface ChatRoomFilters {
  nation?: string
  age?: string
  gender?: string
  date?: string
  keyword?: string
}
