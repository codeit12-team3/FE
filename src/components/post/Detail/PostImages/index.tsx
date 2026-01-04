'use client'

import Image from 'next/image'
import { useState } from 'react'

import { cn, getImageUrl } from '@/lib/common'

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

interface ImagesProps {
  images: string[]
  onClick: (index: number) => void
}

export default function PostImages({ images, onClick }: ImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (images.length === 1) {
    return (
      <div onClick={() => onClick(0)} className="cursor-pointer">
        <PostImageItem src={images[0]} idx={0} priority />
      </div>
    )
  }

  return (
    <div className="mb-6 relative group ">
      <div
        className="relative w-full  rounded-3xl overflow-hidden pointer-events-none md:pointer-events-auto cursor-pointer"
        onClick={() => onClick(currentIndex)}
      >
        <div
          className="flex transition-transform duration-200 ease-in-out text-red-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={img} className="min-w-full">
              <PostImageItem src={img} idx={idx} priority={idx === 0} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex ">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              goToSlide(index)
            }}
            className="p-2 cursor-pointer"
            aria-label={`${index + 1}번째 이미지로 이동`}
          >
            <div
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                currentIndex === index
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/75',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
