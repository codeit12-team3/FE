'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { uploadPostImages } from '@/api/images/images.client'
import { IconImagePlus, IconX } from '@/assets/svgr'
import { toast } from '@/components/common/Toast'
import { Label } from '@/components/ui'
import useImageCompress from '@/hooks/member/useImageCompress'
import { getImageUrl } from '@/lib/common'
import type { PostFormValues } from '@/types/posts/schema'

const MAX_IMAGES = 3

type ImageItem = {
  previewUrl: string
  uploadedUrl: string | null
}

export default function ImageUpload() {
  const { setValue, control } = useFormContext<PostFormValues>()
  const formImages = useWatch({ control, name: 'images' })
  const { compress } = useImageCompress('post')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const initializedRef = useRef(false)
  const [images, setImages] = useState<ImageItem[]>([])
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (initializedRef.current || !formImages?.length || images.length > 0) {
      return
    }
    setImages(
      formImages.map((url) => ({
        previewUrl: url,
        uploadedUrl: url,
      })),
    )
    initializedRef.current = true
  }, [formImages, images.length])

  const openPicker = () => {
    if (!isUploading) {
      fileInputRef.current?.click()
    }
  }

  const syncFormImages = (imageList: ImageItem[]) => {
    const urls = imageList
      .map((img) => img.uploadedUrl)
      .filter((url): url is string => url !== null)
    setValue('images', urls, { shouldValidate: true, shouldDirty: true })
  }

  const getImageSrc = (src: string): string => {
    return src.startsWith('blob:') ? src : getImageUrl(src)
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList) return

    const remaining = MAX_IMAGES - images.length

    if (remaining <= 0) {
      toast.error(`이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`)
      e.target.value = ''
      return
    }

    const files = Array.from(fileList).slice(0, remaining)
    setIsUploading(true)

    try {
      const compressedFiles: File[] = []
      const tempPreviews: ImageItem[] = []

      for (const file of files) {
        const { file: compressedFile, previewUrl } = await compress(file)
        compressedFiles.push(compressedFile)
        tempPreviews.push({
          previewUrl,
          uploadedUrl: null,
        })
      }

      const updatedImages = [...images, ...tempPreviews]
      setImages(updatedImages)

      const uploadedPaths = await uploadPostImages(compressedFiles, 'POST')

      const finalImages = updatedImages.map((img, idx) => {
        const uploadIndex = idx - images.length
        if (uploadIndex >= 0 && uploadIndex < uploadedPaths.length) {
          return { ...img, uploadedUrl: uploadedPaths[uploadIndex] }
        }
        return img
      })

      setImages(finalImages)
      syncFormImages(finalImages)

      toast.success(`이미지 업로드 완료`)
    } catch {
      toast.error('이미지 업로드에 실패했습니다.')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  const removeImage = (index: number) => {
    const imageToRemove = images[index]
    if (imageToRemove.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.previewUrl)
    }

    const updated = images.filter((_, i) => i !== index)
    setImages(updated)
    syncFormImages(updated)
  }

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(img.previewUrl)
        }
      })
    }
  }, [images])

  return (
    <div className="mb-6">
      <Label className="mb-2">
        이미지{' '}
        <span className="text-gray-500 text-xs">(첫 번째가 대표 이미지)</span>
      </Label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={openPicker}
          disabled={isUploading}
          className="bg-gray-200 rounded-xl md:size-27.5 size-20 flex items-center justify-center disabled:opacity-50 transition-colors relative cursor-pointer"
          aria-label="이미지 업로드"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-1">
              <div className="size-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <IconImagePlus className="size-7 text-gray-400" />
          )}
        </button>

        {Array.from({ length: MAX_IMAGES }).map((_, index) => {
          const image = images[index]

          return (
            <div
              key={index}
              className="relative md:size-27.5 size-20 flex items-center justify-center overflow-hidden"
            >
              {image ? (
                <>
                  <Image
                    src={getImageSrc(image.previewUrl)}
                    alt={`${index === 0 ? '대표 이미지' : `preview-${index + 1}`}`}
                    fill
                    className="object-cover rounded-xl "
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0.5 right-0.5 bg-black/70 size-5 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors z-10 cursor-pointer"
                    aria-label="이미지 삭제"
                  >
                    <IconX className="text-white size-4" />
                  </button>
                </>
              ) : null}
            </div>
          )
        })}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />

      <p className="text-gray-400 font-medium text-sm mt-2">
        최대 3장, 5MB 제한
      </p>
    </div>
  )
}
