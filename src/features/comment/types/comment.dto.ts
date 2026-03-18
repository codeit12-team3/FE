import { Comment, Reply } from './comment.model'

export interface PaginatedResponse<T> {
  content: T[]
  isLast: boolean
}

export type GetCommentsResponse = PaginatedResponse<Comment>

export type GetRepliesResponse = PaginatedResponse<Reply>
