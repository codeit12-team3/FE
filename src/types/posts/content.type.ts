export enum AgeType {
  TWENTY = 'TWENTY',
  THIRTY = 'THIRTY',
  FOURTY = 'FOURTY',
  FIFTY = 'FIFTY',
  ETC = 'ETC',
}

export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  ALL = 'ALL',
}

export interface Period {
  startDate: string
  endDate: string
}

export interface PostListItem {
  postId: number
  title: string
  nation: string
  region: string
  period: {
    startDate: string
    endDate: string
  }
  recruitStatus: 'RECRUITING' | 'CLOSED'
  tags: string[]
  nickname: string
  currentMembers: number
  maxMembers: number
  conditions: {
    ageType: string
    genderCondition: string
  }
  isBookmarked: boolean
  thumbnail: string
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
