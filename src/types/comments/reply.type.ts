export interface ReplyType {
  content: ReplyContent[]
  isLast: boolean
}
export interface ReplyContent {
  commentId: number
  parentId: number
  memberId: number
  imageUrl: string
  nickname: string
  content: string
  createdAt: string
  updatedAt: string
  isUpdated: boolean
  depth: number
}
