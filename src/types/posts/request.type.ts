import { AgeType, GenderType } from './content.type'

export interface PostParams {
  size?: number
  nation?: string
  date?: string
  ageType?: AgeType
  gender?: GenderType
  keyword?: string
  lastItemId?: string
}

export interface PostFilterParams {
  nation?: string
  date?: string
  ageType?: AgeType
  gender?: GenderType
  keyword?: string
}
export interface PostApiParams {
  nation?: string
  date?: string
  ageType?: AgeType
  gender?: GenderType
  keyword?: string
  size?: number
  lastItemId?: string
}

export interface PostCreatePayload {
  title: string
  nation: string
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
