import { AgeType, GenderType } from './content.type'

export interface PostParams {
  region: string
  date: string
  age: string
  ageType: AgeType
  gender: GenderType
  keyword: string
}
export interface PostApiParams {
  region?: string
  date?: string
  ageType?: AgeType
  gender?: GenderType
  keyword?: string
  size?: number
  lastPostId?: string
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
  ageType: AgeType
}
