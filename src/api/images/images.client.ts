import { v4 as uuidv4 } from 'uuid'

import { ApiResponse } from '@/types/common'
import { PresignedUrlRequest, PresignedUrlResponse } from '@/types/member'

import { axios } from '../common'

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
) => {
  try {
    const res = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': contentType,
      },
    })

    if (!res.ok) {
      throw new Error(`S3 upload failed: ${res.status}`)
    }

    return res
  } catch (e) {
    throw e
  }
}

/**
 * Content-Type 매핑
 */
const getContentType = (imageType: string): string => {
  const typeMap: Record<string, string> = {
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    WEBP: 'image/webp',
  }
  return typeMap[imageType] || 'image/jpeg'
}

/**
 * 파일에서 이미지 타입 추출
 */
const getImageTypeFromFile = (file: File): 'JPEG' | 'PNG' | 'WEBP' => {
  const fileType = file.type.split('/')[1]?.toUpperCase() || 'JPEG'
  if (fileType === 'JPEG' || fileType === 'JPG') return 'JPEG'
  if (fileType === 'PNG') return 'PNG'
  if (fileType === 'WEBP') return 'WEBP'
  return 'JPEG'
}

/**
 * 이미지업로드 프리사인드랑 S3올리는거 통합
 */
export const uploadPostImages = async (
  files: File[],
  imageDirectory: 'POST',
): Promise<string[]> => {
  const results = await Promise.all(
    files.map(async (file) => {
      const imageType = getImageTypeFromFile(file)

      const presignedData = await getPresignedUrl({
        images: [
          {
            imageId: uuidv4(),
            imageType: imageType,
            imageDirectory,
          },
        ],
      })

      const { presignedUrl, image } = presignedData[0]
      await uploadToS3(presignedUrl, file, getContentType(imageType))
      return image
    }),
  )

  return Array.from(new Set(results))
}

export const uploadMemberImage = async (
  file: File | Blob,
  imageType: 'JPEG' | 'PNG' | 'WEBP', // ✅ 'JPG', 'SVG' 제거
  imageDirectory: 'MEMBER',
): Promise<string> => {
  // 1. Presigned URL 발급
  const presignedData = await getPresignedUrl({
    images: [
      {
        imageId: uuidv4(),
        imageType,
        imageDirectory,
      },
    ],
  })

  // 2. 실제 파일/Blob의 Content-Type 사용 (간소화) ✅
  const actualContentType = file.type || getContentType(imageType)

  // 3. S3 업로드
  const { presignedUrl, image } = presignedData[0]
  await uploadToS3(presignedUrl, file, actualContentType)

  // 4. 이미지 경로 반환
  return image
}

export const deleteUnusedImage = async (imagePath: string): Promise<void> => {
  await axios.delete(`/api/images/${encodeURIComponent(imagePath)}`)
}
