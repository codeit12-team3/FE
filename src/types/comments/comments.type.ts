export interface CommentContent {
  commentId: number
  parentId: number | null
  memberId: number
  imageUrl: string | null
  nickname: string
  content: string
  createdAt: number
  updatedAt: number | null
  isUpdated: boolean
  depth: number
}

export interface CommentType {
  content: CommentContent[]
  isLast: boolean
}
