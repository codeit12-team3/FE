export interface TravelSearchParams {
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

export interface Period {
  startDate: string
  endDate: string
}

export interface PostContent {
  postId: number
  title: string
  region: string
  period: Period
  recruitStatus: 'RECRUITING' | 'CLOSED'
  tags: string[]
  nickname: string
  currentMembers: number
  maxMembers: number
  conditions: [ageCondition: string, birthYear: number, genderCondition: string]
  bookmarked: boolean
  thumbnail: string
}

export interface Post {
  content: PostContent[]
  isLast: boolean
}
