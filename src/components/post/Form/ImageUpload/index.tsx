'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { uploadPostImages } from '@/api/images/images.client'
import { IconImagePlus, IconX } from '@/assets/svgr'
import { toast } from '@/components/common/Toast'
import { Label } from '@/components/ui'
import { getImageUrl } from '@/lib/common'
import type { PostFormValues } from '@/types/posts/schema'

const MAX_IMAGES = 3
const MAX_FILE_SIZE = 5 * 1024 * 1024

type ImageItem = {
  kind: 'existing' | 'new'
  url: string
}

export default function ImageUpload() {
  const { setValue, register, control } = useFormContext<PostFormValues>()
  const formImages = useWatch({ control, name: 'images' })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const initializedRef = useRef(false)

  const [existingUrls, setExistingUrls] = useState<string[]>([])
  const [newPreviews, setNewPreviews] = useState<string[]>([])
  const [newUploadedUrls, setNewUploadedUrls] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    register('images')
  }, [register])

  useEffect(() => {
    if (initializedRef.current) return
    if (!formImages?.length) return

    if (newPreviews.length > 0 || newUploadedUrls.length > 0) return

    setExistingUrls(formImages)
    initializedRef.current = true
  }, [formImages, newPreviews.length, newUploadedUrls.length])

  const totalImages = existingUrls.length + newUploadedUrls.length
  const canAddMore = totalImages < MAX_IMAGES

  const openPicker = () => {
    if (!isUploading && canAddMore) {
      fileInputRef.current?.click()
    }
  }

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`${file.name}은(는) 5MB를 초과합니다.`)
      return false
    }
    if (!file.type.startsWith('image/')) {
      toast.error(`${file.name}은(는) 이미지 파일이 아닙니다.`)
      return false
    }
    return true
  }

  const syncFormImages = (existing: string[], newUploaded: string[]) => {
    const allImages = [...existing, ...newUploaded]
    setValue('images', allImages, { shouldValidate: true, shouldDirty: true })
  }

  const getImageSrc = (src: string): string => {
    return src.startsWith('blob:') ? src : getImageUrl(src)
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList) return

    const remaining = MAX_IMAGES - totalImages

    if (remaining <= 0) {
      toast.error(`이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`)
      e.target.value = ''
      return
    }

    const validFiles = Array.from(fileList)
      .filter(validateFile)
      .slice(0, remaining)

    if (validFiles.length === 0) {
      e.target.value = ''
      return
    }

    setIsUploading(true)

    try {
      const uploadedPaths = await uploadPostImages(validFiles, 'POST')
      const blobUrls = validFiles.map((file) => URL.createObjectURL(file))

      const updatedNewUploaded = [...newUploadedUrls, ...uploadedPaths]

      setNewPreviews((prev) => [...prev, ...blobUrls])
      setNewUploadedUrls(updatedNewUploaded)

      syncFormImages(existingUrls, updatedNewUploaded)

      toast.success(`${uploadedPaths.length}개 업로드 완료`)
    } catch {
      toast.error('이미지 업로드에 실패했습니다.')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  const removeExisting = (index: number) => {
    const updated = existingUrls.filter((_, i) => i !== index)
    setExistingUrls(updated)
    syncFormImages(updated, newUploadedUrls)
  }

  const removeNew = (index: number) => {
    const blobUrl = newPreviews[index]
    if (blobUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(blobUrl)
    }

    setNewPreviews((prev) => prev.filter((_, i) => i !== index))
    setNewUploadedUrls((prev) => {
      const updated = prev.filter((_, i) => i !== index)
      syncFormImages(existingUrls, updated)
      return updated
    })
  }

  useEffect(() => {
    return () => {
      newPreviews.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [newPreviews])

  const combinedImages: ImageItem[] = [
    ...existingUrls.map((url) => ({ kind: 'existing' as const, url })),
    ...newPreviews.map((url) => ({ kind: 'new' as const, url })),
  ]

  const renderImageSlot = (index: number) => {
    const image = combinedImages[index]

    if (image) {
      return (
        <>
          <Image
            src={getImageSrc(image.url)}
            alt={`${index === 0 ? '대표 이미지' : `preview-${index + 1}`}`}
            fill
            className="object-cover rounded-xl"
          />
          <button
            type="button"
            onClick={() => {
              if (image.kind === 'existing') {
                removeExisting(index)
              } else {
                removeNew(index - existingUrls.length)
              }
            }}
            className="absolute top-0.5 right-0.5 bg-black/70 size-5 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors z-10"
            aria-label="이미지 삭제"
          >
            <IconX className="text-white size-4" />
          </button>
        </>
      )
    }

    return (
      <div
        className="w-full h-full  disabled:opacity-50 transition-colors flex items-center justify-center"
        aria-label="이미지 추가"
      ></div>
    )
  }

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
          disabled={isUploading || !canAddMore}
          className="bg-gray-200 rounded-xl md:size-27.5 size-20 flex items-center justify-center disabled:opacity-50 transition-colors relative cursor-pointer"
          aria-label="이미지 업로드"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-1 ">
              <div className="size-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <IconImagePlus className="size-7 text-gray-400" />
          )}
        </button>

        {Array.from({ length: MAX_IMAGES }).map((_, index) => (
          <div
            key={index}
            className="relative  md:size-27.5 size-20 flex items-center justify-center overflow-hidden"
          >
            {renderImageSlot(index)}
          </div>
        ))}
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
