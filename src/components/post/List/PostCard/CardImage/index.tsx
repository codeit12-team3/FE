import Image from 'next/image'

import { getImageUrl } from '@/lib/common'

interface PostCardImageProps {
  thumbnail: string
  title: string
  priority?: boolean
  recruitStatus: 'RECRUITING' | 'COMPLETED' | 'FINISH'
}

export default function PostCardImage({
  thumbnail,
  title,
  priority = false,
  recruitStatus,
}: PostCardImageProps) {
  return (
    <div className="relative md:w-[188px] h-[188px] md:rounded-2xl overflow-hidden shrink-0 bg-gray-200 w-full rounded-t-2xl">
      <Image
        key={thumbnail}
        src={getImageUrl(thumbnail)}
        alt={title}
        width={188}
        height={188}
        priority={priority}
        style={{ width: '100%', height: '100%' }}
        className="object-cover flex items-center justify-center"
      />
      {recruitStatus === 'COMPLETED' && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <p className="text-white text-xl font-bold">모집 마감</p>
        </div>
      )}
    </div>
  )
}
