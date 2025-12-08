import { Gender, MBTI } from '@/constants/member'

export interface Member {
  email: string
  nickname: string
  brith: string
  gender: Gender
  mbti: MBTI
}
