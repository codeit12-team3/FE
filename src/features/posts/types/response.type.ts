import { MyPosts, PostListItem } from './content.type'

export interface FetchPostsResponse {
  content: PostListItem[]
  isLast: boolean
}
export interface FetchMyPosts {
  content: MyPosts[]
  isLast: boolean
}
