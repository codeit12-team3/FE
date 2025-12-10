import { PostContent } from './content.type'

export interface FetchPostsResponse {
  content: PostContent[]
  isLast: boolean
  totalCount: number
}
