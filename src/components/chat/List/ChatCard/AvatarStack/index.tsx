import Image from 'next/image'

import { getImageUrl } from '@/lib/common'

interface AvatarStackProps {
  participantImage: string[]
}

export default function AvatarStack({ participantImage }: AvatarStackProps) {
  const visibleImages = participantImage.slice(0, 4)
  const extraCount = participantImage.length - 4

  return (
    <div className="flex items-center -space-x-2.5">
      {visibleImages.map((imageUrl, index) => (
        <Image
          key={index}
          src={getImageUrl(imageUrl)}
          alt="참여자 프로필"
          width={29}
          height={29}
          className="rounded-full"
        />
      ))}

      {extraCount > 0 && (
        <div className="flex h-[29px] w-[29px] items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-500 -tracking-[0.28px]">
          +{extraCount}
        </div>
      )}
    </div>
  )
}
