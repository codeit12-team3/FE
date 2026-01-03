import { Gender, MBTI } from '@/constants/member'

import { Member } from '../member'

export type OAuth = 'google' | 'kakao' | 'naver'

export interface TokenRes {
  accessToken: string
  refreshToken: string
  accessTokenExpiration: number
  refreshTokenExpiration: number
}

export interface SignupEmailReq {
  email: string
  password: string
  nickname: string
  birth: string
  gender: Gender
  mbti: MBTI
}

export interface SigninEmailReq {
  email: string
  password: string
}

export interface SignupEmailRes extends Member {
  tokenResponse: TokenRes
}

export interface SigninEmailRes extends Member {
  tokenResponse: TokenRes
}

export interface UserSession extends Member {
  accessToken: string
}

export type OAuthGoogleRes =
  | SigninEmailRes
  | {
      email: string
      isRegister: false
    }

export interface OAuthGoogleSignupReq {
  email: string
  nickname: string
  birth: string
  gender: Gender
  mbti: MBTI
}
