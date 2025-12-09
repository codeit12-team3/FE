export type GenderType = 'MALE' | 'FEMALE' | 'ALL' | ''
export type AgeType = 'OLDER' | 'YOUNGER' | ''

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
