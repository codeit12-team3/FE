import { Gender, MBTI } from '@/constants/member'

export interface Member {
  email: string
  nickname: string
  birth: string
  gender: Gender
  mbti: MBTI
}

export interface UpdateMyProfileReq {
  nickname?: string
  name?: string
  birth?: string
  gender?: 'male' | 'female'
  mbti?: string
  image?: string
  accommodation?: string
  travelStyle?: string
  bio?: string
}

export interface MyProfile {
  memberId: string
  nickname: string
  name: string
  birth: string
  gender: 'male' | 'female'
  image: string | null
  mbti?: string
  accommodation?: string
  travelStyle?: string
  bio?: string
}
