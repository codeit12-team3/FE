import { v4 as uuidv4 } from 'uuid'

import { ApiResponse } from '@/types/common'
import {
  MyProfile,
  PresignedUrlRequest,
  PresignedUrlResponse,
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

/**
 * Content-Type 매핑
 */
const getContentType = (imageType: string): string => {
  const typeMap: Record<string, string> = {
    JPG: 'image/jpeg',
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    SVG: 'image/svg+xml',
  }
  return typeMap[imageType] || 'image/jpeg'
}

/**
 * Presigned URL 발급 요청 (수정)
 */
export const getPresignedUrl = async (
  data: PresignedUrlRequest,
): Promise<PresignedUrlResponse> => {
  const res = await axios.post<
    ApiResponse<
      Array<{
        imageId: string
        presignedUrl: string
        image: string
      }>
    >
  >('/v1/images/presigned-url', data)

  // 1. success 체크
  if (!res.data.success) {
    throw new Error('Presigned URL 발급 실패')
  }

  // 2. data 존재 확인 (data가 직접 배열)
  if (!res.data.data) {
    throw new Error('Presigned URL 응답 데이터가 없습니다')
  }

  // 3. data가 배열인지 확인
  const urlsArray = res.data.data
  if (!Array.isArray(urlsArray)) {
    throw new Error('Presigned URL 배열이 올바르지 않습니다')
  }

  if (urlsArray.length === 0) {
    throw new Error('Presigned URL 배열이 비어있습니다')
  }

  // 4. PresignedUrlResponse 형태로 반환
  return { urls: urlsArray }
}

/**
 * 이미지 업로드 (안전성 강화)
 */
export const uploadImage = async (
  file: File | Blob,
  imageType: 'JPG' | 'PNG' | 'SVG',
  imageDirectory: 'MEMBER' | 'POST' = 'MEMBER',
): Promise<string> => {
  try {
    // 1. Presigned URL 발급
    const imageId = uuidv4()

    const presignedData = await getPresignedUrl({
      images: [
        {
          imageId,
          imageType,
          imageDirectory,
        },
      ],
    })

    // 첫 번째 URL 정보 추출
    const urlInfo = presignedData.urls[0]
    if (!urlInfo || !urlInfo.presignedUrl || !urlInfo.image) {
      throw new Error('Presigned URL 정보가 올바르지 않습니다')
    }

    const { presignedUrl, image } = urlInfo

    // 2. S3 업로드
    const contentType = getContentType(imageType)

    const response = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
      },
      body: file,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('S3 업로드 실패:', {
        status: response.status,
        statusText: response.statusText,
        errorText,
      })
      throw new Error(
        `S3 업로드 실패: ${response.status} ${response.statusText}`,
      )
    }

    return image
  } catch (error) {
    console.error('uploadImage 전체 실패:', error)
    throw error
  }
}
