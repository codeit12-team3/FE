import { default as originAxios } from 'axios'

import { BASE_URL, TIMEOUT_LIMIT } from '@/constants/common'
import {
  SigninEmailReq,
  SigninEmailRes,
  SignupEmailReq,
  SignupEmailRes,
} from '@/types/auth'
import { ApiResponse } from '@/types/common'

import { axios } from '../common'

/**
 * 이메일 인증 코드 요청
 * @param email 이메일주소
 */
export const sendEmailCode = async (email: string) => {
  return await axios.post<ApiResponse<null>>('/v1/auth/email/code', {
    email,
  })
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
 * next-auth와의 순환 참조 문제로 인한
 */
export const renewalToken = async (token: string) => {
  const res = await originAxios.post<ApiResponse<SigninEmailRes>>(
    `${BASE_URL}/v1/auth/refresh`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refreshToken=${token}`,
      },
      timeout: TIMEOUT_LIMIT,
    },
  )

  return res.data
}
