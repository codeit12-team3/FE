import Image from 'next/image'

import { cn, getImageUrl } from '@/lib/common'

const DEFAULT_THUMBNAIL = '/images/thumbnail-default.png'

interface CardThumbnailProps {
  imageUrl: string | null
  variant?: 'post' | 'chat'
  recruitStatus?: 'COMPLETED' | 'RECRUITING' | 'FINISH'
}

export default function CardThumbnail({
  imageUrl,
  variant = 'post',
  recruitStatus,
}: CardThumbnailProps) {
  const shouldShowOverlay = variant === 'post' && recruitStatus === 'COMPLETED'

  const imageSrc = imageUrl ? getImageUrl(imageUrl) : DEFAULT_THUMBNAIL

  return (
    <div
      className={cn(
        'relative overflow-hidden shrink-0',
        variant === 'post' &&
          'w-full md:h-47 md:w-47 md:aspect-square rounded-t-3xl md:rounded-full',
        variant === 'chat' && 'w-12 h-12 md:w-25 md:h-25 rounded-full',
      )}
    >
      <Image
        fill
        src={imageSrc}
        alt={imageUrl ? '게시글 썸네일' : '채팅방 썸네일'}
        className="object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = DEFAULT_THUMBNAIL
        }}
      />

      {shouldShowOverlay && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <p className="text-white font-bold">모집 마감</p>
        </div>
      )}
    </div>
  )
}
