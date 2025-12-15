'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Skeleton } from '@/components/ui'
import { getImageUrl } from '@/lib/common'

interface PostImagesProps {
  images: string[]
}

function PostImageItem({ src, idx }: { src: string; idx: number }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
      {isLoading && (
        <Skeleton className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
      )}

      <Image
        src={getImageUrl(src)}
        alt={`post-image-${idx}`}
        fill
        sizes="(max-width: 768px) 100vw, 128px"
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}

export default function PostImages({ images }: PostImagesProps) {
  if (!images || images.length === 0) {
    return (
      <div className="mb-6 h-32 flex items-center justify-center bg-gray-50 rounded-lg text-sm text-gray-400">
        등록된 이미지가 없습니다.
      </div>
    )
  }

  return (
    <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide pb-2">
      {images.map((src, idx) => (
        <PostImageItem key={src + idx} src={getImageUrl(src)} idx={idx} />
      ))}
    </div>
  )
}
