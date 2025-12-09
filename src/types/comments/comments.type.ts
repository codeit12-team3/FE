export interface CommentType {
  commentId: number
  parentId: number | null
  memberId: number | null
  imageUrl: string | null
  nickname: string | null
  content: string
  createdAt: number | null
  updatedAt: number | null
  isUpdated: boolean | null
  depth: number
}
