'use client'

import Image from 'next/image'
import { useState } from 'react'

import { cn, getImageUrl } from '@/lib/common'

interface PostImagesProps {
  images: string[]
}
const DEFAULT_IMAGE = '/images/thumbnail-default.png'

function PostImageItem({
  src,
  idx,
  priority = false,
}: {
  src: string
  idx: number
  priority?: boolean
}) {
  return (
    <div className="relative md:h-71 h-57 rounded-3xl overflow-hidden shrink-0 w-full">
      <Image
        src={src.startsWith('/') ? src : getImageUrl(src)}
        alt={`post-image-${idx}`}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        priority={priority}
        className="object-cover transition-opacity duration-300 rounded-3xl "
      />
      <div className="absolute inset-0 rounded-3xl pointer-events-none" />
    </div>
  )
}

export default function PostImages({ images }: PostImagesProps) {
  const imageList = images && images.length > 0 ? images : [DEFAULT_IMAGE]
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (imageList.length === 1) {
    return (
      <div>
        <PostImageItem src={imageList[0]} idx={0} priority />
      </div>
    )
  }

  return (
    <div className="mb-6 relative group ">
      <div className="relative w-full  rounded-3xl overflow-hidden ">
        <div
          className="flex transition-transform duration-200 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imageList.map((img, idx) => (
            <div key={idx} className="min-w-full">
              <PostImageItem src={img} idx={idx} priority={idx === 0} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {imageList.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all cursor-pointer',
              currentIndex === index
                ? 'bg-white w-2'
                : 'bg-white/50 hover:bg-white/75',
            )}
            aria-label={`${index + 1}번째 이미지로 이동`}
          />
        ))}
      </div>
    </div>
  )
}
