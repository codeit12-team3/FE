/**
 * 이미지 경로 설정 유틸 함수
 * @param path
 */
export const getImageUrl = (path: string | null | undefined) => {
  if (!path) {
    return '/images/default.png'
  }

  if (path.startsWith('http')) {
    return path
  }

  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${path}`
}
