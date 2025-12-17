'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Skeleton } from '@/components/ui'
import { cn, getImageUrl } from '@/lib/common'

interface PostImagesProps {
  images: string[]
}
const DEFAULT_IMAGE = '/images/thumbnail-default.png'

function PostImageItem({ src, idx }: { src: string; idx: number }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-full h-96 rounded-3xl overflow-hidden bg-gray-100">
      {isLoading && (
        <Skeleton className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
      )}

      <Image
        src={src.startsWith('/') ? src : getImageUrl(src)}
        alt={`post-image-${idx}`}
        fill
        quality={100}
        sizes="(max-width: 768px) 100vw, 800px"
        className={cn(
          'object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
        onLoad={() => setIsLoading(false)}
      />
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
      <div className="mb-6">
        <PostImageItem src={imageList[0]} idx={0} />
      </div>
    )
  }

  return (
    <div className="mb-6 relative group">
      <PostImageItem src={imageList[currentIndex]} idx={currentIndex} />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {imageList.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
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
