import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { IconChevronLeft, IconChevronRight, IconX } from '@/assets/svgr'
import { cn, getImageUrl } from '@/lib/common'

interface ImageModalProps {
  images: string[]
  onClose: () => void
  initialIndex?: number
}
export default function ImageModal({
  images,
  onClose,
  initialIndex = 0,
}: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [loading, setLoading] = useState<Set<number>>(new Set())

  const ImageLoad = (index: number) => {
    setLoading((prev) => new Set(prev).add(index))
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  useEffect(() => {
    const handlekeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose()
      }
    }
    if (images) {
      document.addEventListener('keydown', handlekeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handlekeyDown)
    }
  }, [onClose, images])

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 md:px-6"
      style={{ zIndex: 9999 }}
      onClick={onClose}
      aria-modal="true"
      aria-labelledby="modal"
    >
      <button
        onClick={onClose}
        className="absolute top-12 right-4 text-white hover:text-gray-300 transition-colors z-10 cursor-pointer"
        aria-label="닫기"
      >
        <IconX className="size-8" />
      </button>
      {/* 이미지 */}
      <div className="relative inline-block">
        {!loading.has(currentIndex) && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        <Image
          src={
            images[currentIndex].startsWith('/')
              ? images[currentIndex]
              : getImageUrl(images[currentIndex])
          }
          alt={`이미지 ${currentIndex + 1}`}
          width={1200}
          height={800}
          className="object-contain max-w-[90vw] max-h-[70vh] w-auto h-auto"
          priority
          onLoad={() => ImageLoad(currentIndex)}
          onClick={(e) => e.stopPropagation()}
        />
        {/* 버튼 */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/30 rounded-full p-2 cursor-pointer"
              aria-label="이전 이미지"
            >
              <IconChevronLeft className="size-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/30 rounded-full p-2 cursor-pointer"
              aria-label="다음 이미지"
            >
              <IconChevronRight className="size-8" />
            </button>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 ">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    currentIndex === index ? 'bg-white' : 'bg-white/50',
                  )}
                  aria-label={`이미지 ${index + 1}로 이동`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
