import { PostListItem } from './content.type'

export interface FetchPostsResponse {
  content: PostListItem[]
  isLast: boolean
}
