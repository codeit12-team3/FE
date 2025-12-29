import Image from 'next/image'

import { getImageUrl } from '@/lib/common'

interface CardThumbnailProps {
  imageUrl: string
  variant?: 'post' | 'chat'
  recruitStatus?: 'COMPLETED' | 'RECRUITING' | 'FINISH'
}

export default function CardThumbnail({
  imageUrl,
  variant = 'post',
  recruitStatus,
}: CardThumbnailProps) {
  const shouldShowOverlay = variant === 'post' && recruitStatus === 'COMPLETED'

  return (
    <div className="relative w-47 aspect-square rounded-3xl overflow-hidden bg-bg-disabled">
      <Image
        fill
        src={getImageUrl(imageUrl)}
        alt="게시글 썸네일"
        className="object-cover"
      />

      {shouldShowOverlay && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <p className="text-white">모집 마감</p>
        </div>
      )}
    </div>
  )
}
