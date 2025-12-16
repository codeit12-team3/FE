/**
 * 이미지 경로 설정 유틸 함수
 */
export const getImageUrl = (
  path?: string | null,
  profile?: boolean,
): string => {
  // 1. 값 자체가 없을 때
  if (!path) {
    if (profile) return '/images/profile-default.png'
    return '/images/thumbnail-default.png'
  }

  // 2. 이미 절대 URL
  if (path.startsWith('http')) {
    return path
  }

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL

  // 3. ENV가 없으면 상대경로 그대로
  if (!baseUrl) {
    return path.startsWith('/') ? path : `/${path}`
  }

  // 4. 정상 결합 (슬래시 중복 방지)
  return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
