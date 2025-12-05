export type TravelSearchParams = {
  region?: string
  startDate?: string
  endDate?: string
  status?: 'RECRUITING' | 'CLOSED'
  ageRange?: string
  gender?: 'MALE' | 'FEMALE'
  keyword?: string
  page?: number
  size?: number
}

export type TravelPeriod = {
  startDate: string
  endDate: string
}

export type Post = {
  postId: string
  title: string
  region: string
  period: TravelPeriod
  status: 'RECRUITING' | 'CLOSED'
  currentMembers: number
  maxMembers: number
  bookmarked: boolean | null
  thumbnail: string
}

export type PageInfo = {
  page: number
  size: number
  totalPages: number
  totalElements: number
}

export type ostListResponse = {
  success: boolean
  status: number
  timestamp: string
  data: {
    posts: Post[]
    pageInfo: PageInfo
  }
}
