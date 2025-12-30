import { AgeType, GenderType } from './content.type'

export interface PostParams {
  size?: number
  nation?: string
  date?: string
  ageType?: AgeType
  gender?: GenderType
  keyword?: string
  lastPostId?: string
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
  lastPostId?: string
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

export interface PostUpdatePayload {
  title: string
  nation: string
  region: string
  period: {
    startDate: string
    endDate: string
  }
  maxMembers: number
  content: string
  tags: string[]
  images: {
    add: string[]
    delete: string[]
  }
}
