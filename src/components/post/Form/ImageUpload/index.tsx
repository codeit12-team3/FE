'use client'

import { ImagePlus, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { uploadImage } from '@/api/member/member.clients'
import { Label } from '@/components/ui'
import type { PostFormValues } from '@/types/posts/schema'

export default function ImageUpload() {
  const { setValue, register } = useFormContext<PostFormValues>()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previews, setPreviews] = useState<string[]>([])
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const openPicker = () => {
    if (!isUploading) {
      fileInputRef.current?.click()
    }
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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const filesToUpload = Array.from(files).slice(0, 3 - previews.length)
    if (filesToUpload.length === 0) return

    setIsUploading(true)

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        if (!validateFile(file)) return null

        const s3Url = await uploadImage(file, getImageType(file), 'POST')
        return { preview: URL.createObjectURL(file), s3Url }
      })

      const results = await Promise.allSettled(uploadPromises)
      const successfulUploads = results
        .filter(
          (
            r,
          ): r is PromiseFulfilledResult<{
            preview: string
            s3Url: string
          } | null> => r.status === 'fulfilled' && r.value !== null,
        )
        .map((r) => r.value!)

      if (successfulUploads.length === 0) {
        toast.error('업로드된 이미지가 없습니다.')
        return
      }

      const nextPreviews = [
        ...previews,
        ...successfulUploads.map((r) => r.preview),
      ]
      const nextUrls = [
        ...uploadedUrls,
        ...successfulUploads.map((r) => r.s3Url),
      ]

      setPreviews(nextPreviews)
      setUploadedUrls(nextUrls)
      setValue('images', nextUrls, { shouldValidate: true, shouldDirty: true })

      const failedCount = results.length - successfulUploads.length
      toast.success(
        failedCount > 0
          ? `${successfulUploads.length}개 업로드 성공, ${failedCount}개 실패`
          : `${successfulUploads.length}개의 이미지가 업로드되었습니다.`,
      )
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
      toast.error('이미지 업로드에 실패했습니다.')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  const removeImage = (idx: number) => {
    const nextPreviews = [...previews]
    const nextUrls = [...uploadedUrls]

    URL.revokeObjectURL(nextPreviews[idx])
    nextPreviews.splice(idx, 1)
    nextUrls.splice(idx, 1)

    setPreviews(nextPreviews)
    setUploadedUrls(nextUrls)

    setValue('images', nextUrls, { shouldValidate: true, shouldDirty: true })
  }

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previews])
  const MAX_IMAGES = 3
  useEffect(() => {
    register('images')
  }, [register])
  return (
    <div className="mb-6">
      <Label className="mb-2">이미지</Label>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={openPicker}
          disabled={isUploading || previews.length >= MAX_IMAGES}
          className="bg-bg-disabled rounded-xl size-27.5 flex items-center justify-center hover:bg-bg-hover"
        >
          <ImagePlus className="size-8 text-text-input" />
        </button>
        {Array.from({ length: MAX_IMAGES }).map((_, idx) => {
          const src = previews[idx]
          return (
            <div
              key={idx}
              className="relative bg-bg-disabled rounded-xl size-27.5 flex items-center justify-center"
            >
              {src ? (
                <>
                  <Image
                    src={src}
                    alt={`preview-${idx + 1}`}
                    fill
                    className="object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-1 -right-1 bg-black/50 size-5 rounded-full flex items-center justify-center"
                  >
                    <X className="size-3 text-white" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={openPicker}
                  disabled={isUploading || previews.length >= MAX_IMAGES}
                  className="bg-bg-disabled rounded-xl size-27.5 flex items-center justify-center hover:bg-bg-hover"
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
