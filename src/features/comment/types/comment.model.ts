export interface Comment {
  commentId: number
  memberId: number
  imageUrl: string
  nickname: string
  content: string
  createdAt: string
  updatedAt: string
  isUpdated: boolean
  depth: number
  commentsCount: number
}

export interface Reply extends Comment {
  parentId: number
}
