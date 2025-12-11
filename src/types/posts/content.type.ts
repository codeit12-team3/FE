export type GenderType = 'MALE' | 'FEMALE' | 'ALL'
export type AgeType = 'TWENTY' | 'THIRTY' | 'FOURTY' | 'FIFTY' | 'ETC'

export interface Period {
  startDate: string
  endDate: string
}

export interface PostContent {
  postId: string
  title: string
  content: string
  nation: string
  region: string
  period: Period
  recruitStatus: 'RECRUITING' | 'CLOSED'
  tags: string[]
  nickname: string
  currentMembers: number
  maxMembers: number
  conditions: {
    ageCondition: AgeType
    genderCondition: GenderType
  }
  isBookmarked: boolean
  thumbnail: string[]
  createdAt: string
  updatedAt: string
}
