import { Gender, MBTI } from '@/constants/member'

export interface Member {
  email: string
  nickname: string
  birth: string
  gender: Gender
  mbti: MBTI
}
