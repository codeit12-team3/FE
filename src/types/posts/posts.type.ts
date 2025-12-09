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
  postId: string
  title: string
  region: string
  period: Period
  recruitStatus: 'RECRUITING' | 'CLOSED'
  tags: string[]
  nickname: string
  currentMembers: number
  maxMembers: number
  conditions: {
    ageCondition: string
    birthYear: number
    genderCondition: string
  }
  bookmarked: boolean
  thumbnail: string
  createdAt: string
  updatedAt: string
}

export interface Post {
  content: PostContent[]
  isLast: boolean
}

export interface PostParams {
  region?: string
  date?: string
  age?: number
  ageType?: 'OLDER' | 'YOUNGER'
  gender?: 'MALE' | 'FEMALE' | 'ALL'
  keyword?: string
  size?: number
  isLast?: boolean
}
export interface PostCreatePayload {
  title: string
  region: string
  startDate: string
  endDate: string
  maxMembers: number
  content: string
  tags: string[]
  images: string[]
  genderType: 'MALE' | 'FEMALE' | 'ALL'
  birthYear: number
  ageType: 'OLDER' | 'YOUNGER'
}
