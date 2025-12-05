import { Gender, MBTI } from '@/constants/member'

interface SignupEmailReq {
  email: string
  password: string
  nickname: string
  birth: string
  gender: Gender
  mbti: MBTI
}

interface SignupEmailRes {
  email: string
  tokenResponse: TokenRes
}

interface TokenRes {
  accessToken: string
  refreshToken: string
  accessTokenExpiration: number
  refreshTokenExpiration: number
}

export type { SignupEmailReq, SignupEmailRes, TokenRes }
