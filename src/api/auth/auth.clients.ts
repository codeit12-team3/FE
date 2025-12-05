import { SignupEmailReq, SignupEmailRes } from '@/types/auth'
import { ApiResponse } from '@/types/common'

import { axios } from '../common'

/**
 * 이메일 인증 코드 요청
 * @param email 이메일주소
 */
export const sendEmailCode = async (email: string) => {
  return await axios.post<ApiResponse<null>>('/auth/email/code', {
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
  return await axios.post<ApiResponse<null>>('/auth/email/verify', {
    email,
    emailVerifyCode: code,
  })
}

/**
 * 회원가입 요청
 * @param body {이메일, 패스워드, 닉네임, 생년월일, 성별, MBTI}
 */
export const signupEmail = async (body: SignupEmailReq) => {
  return await axios.post<ApiResponse<SignupEmailRes>>('/auth/signup', body)
}
