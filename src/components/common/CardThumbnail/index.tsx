import Image from 'next/image'

import { cn, getImageUrl } from '@/lib/common'

const DEFAULT_THUMBNAIL = '/images/thumbnail-default.png'
const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8AKW9mEP9AAAAABJRU5ErkJggg=='

interface CardThumbnailProps {
  imageUrl: string | null
  variant?: 'post' | 'chat' | 'chatroom'
  recruitStatus?: 'COMPLETED' | 'RECRUITING' | 'FINISH'
  isPriority?: boolean
}

export default function CardThumbnail({
  imageUrl,
  variant = 'post',
  recruitStatus,
  isPriority = false,
}: CardThumbnailProps) {
  const shouldShowOverlay = variant === 'post' && recruitStatus === 'COMPLETED'
  const imageSrc = imageUrl ? getImageUrl(imageUrl) : DEFAULT_THUMBNAIL

  return (
    <div
      className={cn(
        'relative overflow-hidden shrink-0 bg-gray-100',
        variant === 'post' &&
          'w-full md:h-47 md:w-47 md:aspect-square rounded-t-3xl md:rounded-full',
        variant === 'chat' && 'w-22 h-22 rounded-3xl',
        variant === 'chatroom' &&
          'w-14 h-14 md:w-20 md:h-20 md:rounded-2xl rounded-xl',
      )}
    >
      <Image
        fill
        src={imageSrc}
        alt={imageUrl ? '게시글 썸네일' : '채팅방 썸네일'}
        className="object-cover"
        priority={isPriority}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          if (target.src !== DEFAULT_THUMBNAIL) {
            target.src = DEFAULT_THUMBNAIL
          }
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
