export type GenderType = 'MALE' | 'FEMALE' | 'ALL'
export type AgeType = 'TWENTY' | 'THIRTY' | 'FOURTY' | 'FIFTY' | 'ETC'
export type MBTIType =
  | 'INTJ'
  | 'INTP'
  | 'ENTJ'
  | 'ENTP'
  | 'INFJ'
  | 'INFP'
  | 'ENFJ'
  | 'ENFP'
  | 'ISTJ'
  | 'ISFJ'
  | 'ESTJ'
  | 'ESFJ'
  | 'ISTP'
  | 'ISFP'
  | 'ESTP'
  | 'ESFP'

export interface Period {
  startDate: string
  endDate: string
}
export interface Stats {
  maxMembers: number
  currentMembers: number
  viewCount: number
}
interface Conditions {
  ageCondition: AgeType
  genderCondition: GenderType
}

interface Writer {
  memberId: number
  nickname: string
  profileImage: string | null
  birth: number
  age: number
  gender: GenderType
  mbti: MBTIType
}
export interface PostContent {
  title: string
  content: string
  nation: string
  region: string
  period: Period
  stats: Stats
  recruitStatus: 'RECRUITING' | 'CLOSED'
  tags: string[]
  nickname: string
  isOwner: boolean
  conditions: Conditions
  isBookmarked: boolean
  bookmarkCount: number
  commentCount: number
  images: string[]
  writer: Writer
  thumbnail: string[]
  createdAt: string
  updatedAt: string
  timestamp: string
}
