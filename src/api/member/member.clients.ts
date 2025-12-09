import { ApiResponse } from '@/types/common'
import { MyProfile, UpdateMyProfileReq } from '@/types/member'

import { axios } from '../common'

/**
 * 닉네임 중복 확인 요청
 * @param 닉네임
 */
export const checkNickname = async (nickname: string) => {
  return await axios.post('/member/nickname/check', {
    nickname,
  })
}

// 내정보 조회
export const getMyProfile = async () => {
  const res = await axios.get<ApiResponse<MyProfile>>('/members/me')
  return res.data
}

// 프로필 수정할때
export const updateMyProfile = async (data: UpdateMyProfileReq) => {
  const res = await axios.patch<ApiResponse<null>>('/members/me', data)
  return res.data
}
