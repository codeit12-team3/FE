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
 * Presigned URL 발급 요청
 */
export const getPresignedUrl = async (
  data: PresignedUrlRequest,
): Promise<PresignedUrlResponse> => {
  const res = await axios.post<ApiResponse<PresignedUrlResponse>>(
    '/v1/images/presigned-url',
    data,
  )
  return res.data.data as PresignedUrlResponse
}

/**
 * S3에 이미지 직접 업로드 (PUT)
 */
export const uploadToS3 = async (
  presignedUrl: string,
  file: File | Blob,
  contentType: string,
): Promise<void> => {
  await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: file,
  })
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
 * 이미지업로드 프리사인드랑 S3올리는거 통합
 */
export const uploadImage = async (
  file: File | Blob,
  imageType: 'JPG' | 'PNG' | 'SVG',
  imageDirectory: 'MEMBER' | 'POST' = 'MEMBER',
): Promise<string> => {
  console.log('🚀 uploadImage 시작', {
    imageType,
    imageDirectory,
    fileSize: file.size,
  })

  // 1. Presigned URL 발급
  console.log('1️⃣ Presigned URL 요청 데이터:', {
    images: [
      {
        imageId: 'uuid-생성됨', // 실제 uuidv4() 결과는 로그에 안 찍히지만 구조 확인
        imageType,
        imageDirectory,
      },
    ],
  })

  const presignedData = await getPresignedUrl({
    images: [
      {
        imageId: uuidv4(),
        imageType,
        imageDirectory,
      },
    ],
  })

  console.log('2️⃣ Presigned URL 응답 수신:', {
    presignedUrl: presignedData.urls[0].presignedUrl.substring(0, 100) + '...', // 너무 길어서 자름
    imagePath: presignedData.urls[0].image,
  })

  const { presignedUrl, image } = presignedData.urls[0]

  // 2. S3 업로드
  console.log('3️⃣ S3 PUT 요청 시작...', {
    url: presignedUrl.substring(0, 100) + '...',
    contentType: getContentType(imageType),
    fileSize: file.size,
  })

  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': getContentType(imageType),
    },
    body: file,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `S3 업로드 실패: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }

  console.log('4️⃣ S3 업로드 성공! (HTTP', response.status, ')')

  // 3. 최종 이미지 경로 반환
  console.log('✅ 최종 반환할 이미지 경로:', image)
  return image
}
/**
 * 클린업에서 사용할 삭제용 (수정안하고 벗어날때)
 */
export const deleteUnusedImage = async (imagePath: string): Promise<void> => {
  await axios.delete(`/api/images/${encodeURIComponent(imagePath)}`)
}
