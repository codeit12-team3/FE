import { ApiResponse } from '@/types/common'
import {
  GetBookmarkedPostsReq,
  GetBookmarkedPostsRes,
  Profile,
  UpdateMyProfileReq,
} from '@/types/member'

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
export const getMyProfile = async () => {
  const { data } = await axios.get<ApiResponse<Profile>>('/v1/members/me')

  if (!data.success) {
    throw new Error(data.data.message || '프로필을 불러오지 못했습니다')
  }

  return data.data
}

// 다른 멤버 정보 조회
export const getOtherProfile = async (memberId: string) => {
  const { data } = await axios.get<ApiResponse<Profile>>(
    `/v1/members/${memberId}`,
  )

  if (!data.success) {
    throw new Error(data.data.message)
  }

  return data.data
}

// 프로필 수정할때
export const updateMyProfile = async (data: UpdateMyProfileReq) => {
  const res = await axios.patch<ApiResponse<null>>('/v1/members/me', data)
  return res.data
}

// 내가 찜한 게시글
export const getBookmarkedPosts = async (params: GetBookmarkedPostsReq) => {
  const { data } = await axios.get<ApiResponse<GetBookmarkedPostsRes>>(
    '/v1/posts/bookmark',
    {
      params: {
        lastPostId: params.lastPostId,
        size: params.size ?? 5,
        nation: params.nation,
        from: params.from,
        to: params.to,
        ageType: params.ageType,
        gender: params.gender,
      },
    },
  )

  if (!data.success) {
    throw new Error(data.data.message)
  }

  return data.data
}
