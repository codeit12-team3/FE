'use client'

import { ImagePlus, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { uploadPostImages } from '@/api/images/images.client'
import { Label } from '@/components/ui'
import { getImageUrl } from '@/lib/common'
import type { PostFormValues } from '@/types/posts/schema'

const MAX_IMAGES = 3

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
    if (!Array.isArray(formImages) || formImages.length === 0) return

    setExistingUrls(formImages)

    setValue('images', formImages, { shouldValidate: true, shouldDirty: false })
    initializedRef.current = true
  }, [formImages, setValue])

  const openPicker = () => {
    if (!isUploading) fileInputRef.current?.click()
  }

  const validateFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error(`${file.name}은(는) 5MB를 초과합니다.`)
      return false
    }
    if (!file.type.startsWith('image/')) {
      toast.error(`${file.name}은(는) 이미지 파일이 아닙니다.`)
      return false
    }
    return true
  }

  const getImageType = (file: File) => {
    const fileType = file.type.split('/')[1]?.toUpperCase() || 'JPG'
    if (fileType === 'JPEG' || fileType === 'JPG') return 'JPG'
    if (fileType === 'PNG') return 'PNG'
    if (fileType === 'SVG+XML' || fileType === 'SVG') return 'SVG'
    return 'JPG'
  }

  const syncFormImages = (
    nextExisting: string[],
    nextNewUploaded: string[],
  ) => {
    const next = [...nextExisting, ...nextNewUploaded]
    setValue('images', next, { shouldValidate: true, shouldDirty: true })
  }

  const resolveSrc = (src: string) => {
    if (src.startsWith('blob:')) return src
    return getImageUrl(src)
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList) return

    const remaining =
      MAX_IMAGES - (existingUrls.length + newUploadedUrls.length)

    if (remaining <= 0) {
      toast.error(`이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`)
      e.target.value = ''
      return
    }

    const files = Array.from(fileList).filter(validateFile).slice(0, remaining)

    if (files.length === 0) {
      e.target.value = ''
      return
    }

    const imageType = getImageType(files[0])

    setIsUploading(true)

    try {
      const uploadedImagePaths = await uploadPostImages(
        files,
        imageType,
        'POST',
      )

      const previews = files.map((file) => URL.createObjectURL(file))

      const nextNewPreviews = [...newPreviews, ...previews]
      const nextNewUploaded = [...newUploadedUrls, ...uploadedImagePaths]

      setNewPreviews(nextNewPreviews)
      setNewUploadedUrls(nextNewUploaded)

      syncFormImages(existingUrls, nextNewUploaded)

      toast.success(`${uploadedImagePaths.length}개 업로드 완료`)
    } catch (error) {
      console.error('이미지 업로드 에러:', error)
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  const removeExisting = (existingIdx: number) => {
    const nextExisting = [...existingUrls]
    nextExisting.splice(existingIdx, 1)

    setExistingUrls(nextExisting)
    syncFormImages(nextExisting, newUploadedUrls)
  }

  const removeNew = (newIdx: number) => {
    const nextPreviews = [...newPreviews]
    const nextNewUploaded = [...newUploadedUrls]

    const previewUrl = nextPreviews[newIdx]
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl)

    nextPreviews.splice(newIdx, 1)
    nextNewUploaded.splice(newIdx, 1)

    setNewPreviews(nextPreviews)
    setNewUploadedUrls(nextNewUploaded)

    syncFormImages(existingUrls, nextNewUploaded)
  }

  useEffect(() => {
    return () => {
      newPreviews.forEach((url) => {
        if (url?.startsWith('blob:')) URL.revokeObjectURL(url)
      })
    }
  }, [newPreviews])

  const combined = [
    ...existingUrls.map((url) => ({ kind: 'existing' as const, url })),
    ...newPreviews.map((url) => ({ kind: 'new' as const, url })),
  ]

  const canAddMore = combined.length < MAX_IMAGES

  return (
    <div className="mb-6">
      <Label className="mb-2">이미지</Label>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={openPicker}
          disabled={isUploading || !canAddMore}
          className="bg-bg-disabled rounded-xl size-27.5 flex items-center justify-center hover:bg-bg-hover disabled:opacity-50"
        >
          <ImagePlus className="size-8 text-text-input" />
        </button>

        {Array.from({ length: MAX_IMAGES }).map((_, idx) => {
          const item = combined[idx]

          return (
            <div
              key={idx}
              className="relative bg-bg-disabled rounded-xl size-27.5 flex items-center justify-center"
            >
              {item ? (
                <>
                  <Image
                    src={resolveSrc(item.url)}
                    alt={`preview-${idx + 1}`}
                    fill
                    className="object-cover rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      if (item.kind === 'existing') {
                        removeExisting(idx)
                      } else {
                        removeNew(idx - existingUrls.length)
                      }
                    }}
                    className="absolute -top-1 -right-1 bg-black/50 size-5 rounded-full flex items-center justify-center"
                  >
                    <X className="size-3 text-white" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={openPicker}
                  disabled={isUploading || !canAddMore}
                  className="bg-bg-disabled rounded-xl size-27.5 flex items-center justify-center hover:bg-bg-hover disabled:opacity-50"
                >
                  <ImagePlus className="size-8 text-text-input" />
                </button>
              )}
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

      <span className="text-muted-foreground font-medium text-sm">
        최대 3장, 5MB 제한
      </span>
    </div>
  )
}
