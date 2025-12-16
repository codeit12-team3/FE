import { ApiResponse } from '@/types/common'
import { MyProfile, UpdateMyProfileReq } from '@/types/member'

import { axios } from '../common'

/**
 * 닉네임 중복 확인 요청
 * @param 닉네임
 */
export const checkNickname = async (nickname: string) => {
  const res = await axios.get<ApiResponse<null>>('/v1/members/nickname/check', {
    params: { nickname },
  })

  return res.data
}

// 내정보 조회
export const getMyProfile = async (): Promise<MyProfile> => {
  const res = await axios.get<ApiResponse<MyProfile>>('/v1/members/me')

  if (!res.data.success) {
    throw new Error(res.data.data?.message || '프로필을 불러오지 못했습니다')
  }

  return res.data.data
}

// 프로필 수정할때
export const updateMyProfile = async (data: UpdateMyProfileReq) => {
  const res = await axios.patch<ApiResponse<null>>('/v1/members/me', data)
  return res.data
}
