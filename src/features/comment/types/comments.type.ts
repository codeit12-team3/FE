export interface CommentContent {
  commentId: number
  memberId: number
  imageUrl: string
  nickname: string
  content: string
  createdAt: string
  updatedAt: string
  isUpdated: boolean
  depth: number
}

export interface CommentType {
  content: CommentContent[]
  isLast: boolean
}
