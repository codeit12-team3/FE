import { default as originAxios } from 'axios'

import { BASE_URL, TIMEOUT_LIMIT } from '@/constants/common'
import {
  OAuthGoogleRes,
  OAuthGoogleSignupReq,
  SigninEmailReq,
  SigninEmailRes,
  SignupEmailReq,
  SignupEmailRes,
  TokenRes,
} from '@/types/auth'
import { ApiResponse } from '@/types/common'

import { axios } from '../common'

/**
 * 이메일 인증 코드 요청
 * @param email 이메일주소
 */
export const sendEmailCode = async (email: string) => {
  const res = await axios.post<ApiResponse<null>>('/v1/auth/email/code', {
    email,
  })

  return res.data
}

/**
 * 이메일 인증 요청
 * @param email 이메일주소
 * @param code 인증코드
 */
export const checkEmailCode = async ({
  email,
  code,
}: {
  email: string
  code: string
}) => {
  const res = await axios.post<ApiResponse<null>>('/v1/auth/email/verify', {
    email,
    emailVerifyCode: code,
  })

  return res.data
}

/**
 * 회원가입 요청
 * @param body {이메일, 패스워드, 닉네임, 생년월일, 성별, MBTI}
 */
export const signupEmail = async (body: SignupEmailReq) => {
  const res = await axios.post<ApiResponse<SignupEmailRes>>(
    '/v1/auth/signup',
    body,
  )

  return res.data
}

/**
 * 로그인 요청
 * @param body {이메일, 패스워드}
 * next-auth와의 순환 참조 문제로 원본 axios 사용
 */
export const signinEmail = async (body: SigninEmailReq) => {
  const res = await originAxios.post<ApiResponse<SigninEmailRes>>(
    `${BASE_URL}/v1/auth/login`,
    body,
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: TIMEOUT_LIMIT,
    },
  )

  return res.data
}

/**
 * 토큰 갱신 요청
 * @param token 리프레시토큰
 * next-auth와의 순환 참조 문제로 원본 axios 사용
 */
export const renewalToken = async (token: string) => {
  const cookieHeader = `refreshToken=${token.trim()}`

  const res = await originAxios.post<ApiResponse<TokenRes>>(
    `${BASE_URL}/v1/auth/refresh`,
    null,
    {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader,
      },
      timeout: TIMEOUT_LIMIT,
    },
  )

  return res.data
}

export const oAuthGoogle = async (idToken: string) => {
  const res = await originAxios.post<ApiResponse<OAuthGoogleRes>>(
    `${BASE_URL}/v1/oauth2/google`,
    { idToken },
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: TIMEOUT_LIMIT,
    },
  )

  return res.data
}

export const oAuthGoogleSignup = async (body: OAuthGoogleSignupReq) => {
  const { data } = await axios.post<ApiResponse<SignupEmailRes>>(
    '/v1/oauth2/signup',
    body,
  )

  if (!data.success) {
    throw new Error(data.data.message)
  }

  return data.data
}
