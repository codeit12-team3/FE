'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { uploadImage } from '@/api/member/member.clients'
import { Button } from '@/components/common'
import { Label } from '@/components/ui'
import type { PostFormValues } from '@/types/posts/schema'

export default function ImageUpload() {
  const { setValue } = useFormContext<PostFormValues>()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previews, setPreviews] = useState<string[]>([])
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const openPicker = () => {
    if (!isUploading) {
      fileInputRef.current?.click()
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const filesToUpload = Array.from(files).slice(0, 3 - previews.length)
    if (filesToUpload.length === 0) return

    setIsUploading(true)

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name}은(는) 5MB를 초과합니다.`)
          return null
        }

        const fileType = file.type.split('/')[1].toUpperCase()
        const imageType =
          fileType === 'JPEG' || fileType === 'JPG'
            ? 'JPG'
            : fileType === 'PNG'
              ? 'PNG'
              : fileType === 'SVG+XML'
                ? 'SVG'
                : 'JPG'

        const s3Url = await uploadImage(
          file,
          imageType as 'JPG' | 'PNG' | 'SVG',
          'POST',
        )

        return {
          preview: URL.createObjectURL(file),
          s3Url,
        }
      })

      const results = await Promise.all(uploadPromises)
      const successfulUploads = results.filter((r) => r !== null) as {
        preview: string
        s3Url: string
      }[]

      const newPreviews = successfulUploads.map((r) => r.preview)
      const newUrls = successfulUploads.map((r) => r.s3Url)

      const nextPreviews = [...previews, ...newPreviews]
      const nextUrls = [...uploadedUrls, ...newUrls]

      setPreviews(nextPreviews)
      setUploadedUrls(nextUrls)
      setValue('images', nextUrls, { shouldValidate: true, shouldDirty: true })

      toast.success(
        `${successfulUploads.length}개의 이미지가 업로드되었습니다.`,
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

  return (
    <div className="mb-6">
      <Label className="mb-2">
        이미지 <span className="text-danger">*</span>
      </Label>

      <div className="flex gap-2">
        <div
          onClick={openPicker}
          className={`flex items-center gap-2 px-4 py-2.5 w-full bg-sub rounded-lg text-sm ${
            isUploading ? 'cursor-wait opacity-60' : 'cursor-pointer'
          }`}
        >
          {isUploading ? (
            <span className="text-muted-foreground font-medium text-base">
              이미지 업로드 중...
            </span>
          ) : previews.length === 0 ? (
            <span className="text-muted-foreground font-medium text-base">
              최대 3장, 5MB 제한
            </span>
          ) : (
            <div className="flex gap-2">
              {previews.map((src, idx) => (
                <div key={src} className="relative">
                  <Image
                    src={src}
                    alt="preview"
                    width={48}
                    height={48}
                    className="rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeImage(idx)
                    }}
                    className="absolute -top-1 -right-1 bg-black/50 text-white size-4 text-xs rounded-full flex items-center justify-center"
                  >
                    <div className="border border-main rounded-full">
                      <X className="size-3" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          type="button"
          onClick={openPicker}
          variant="secondary"
          disabled={isUploading || previews.length >= 3}
        >
          {isUploading ? '업로드 중...' : '파일 찾기'}
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
