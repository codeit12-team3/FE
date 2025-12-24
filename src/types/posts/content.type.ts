import { NationCode } from '@/constants/posts'

export enum AgeType {
  TWENTY = 'TWENTY',
  THIRTY = 'THIRTY',
  FORTY = 'FORTY',
  FIFTY = 'FIFTY',
}

export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  ALL = 'ALL',
}

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
export type RecruitStatus = 'RECRUITING' | 'COMPLETED' | 'FINISH'

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
  ageCondition: AgeType | string
  genderCondition: GenderType | string
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
export interface PostListItem {
  postId: number
  title: string
  nation: NationCode
  region: string
  period: {
    startDate: string
    endDate: string
  }
  recruitStatus: 'RECRUITING' | 'COMPLETED' | 'FINISH'
  tags: string[]
  nickname: string
  currentMembers: number
  maxMembers: number
  conditions: {
    ageType: string
    genderCondition: string
  }
  isOwner: boolean
  isBookmarked: boolean
  isApplied: boolean
  thumbnail: string
}
export interface PostContent {
  title: string
  content: string
  nation: NationCode
  region: string
  period: Period
  stats: Stats
  recruitStatus: 'RECRUITING' | 'COMPLETED' | 'FINISH'
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
  isApplied: boolean
}
export interface MyPosts {
  postId: number
  title: string
  nation: NationCode
  region: string
  period: {
    startDate: string
    endDate: string
  }
  recruitStatus: 'RECRUITING' | 'COMPLETED' | 'FINISH'
  tags: string[]
  currentMembers: number
  maxMembers: number
  thumbnail: string
}
