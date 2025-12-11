'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/common'
import { Label } from '@/components/ui'

export default function ImageUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previews, setPreviews] = useState<string[]>([])

  const openPicker = () => fileInputRef.current?.click()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newUrls: string[] = []

    Array.from(files).forEach((file) => {
      if (previews.length + newUrls.length < 3) {
        newUrls.push(URL.createObjectURL(file))
      }
    })

    setPreviews((prev) => [...prev, ...newUrls])

    e.target.value = ''
  }

  const removeImage = (idx: number) => {
    const next = [...previews]
    URL.revokeObjectURL(next[idx])
    next.splice(idx, 1)
    setPreviews(next)
  }

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previews])

  return (
    <div>
      <Label className="mb-2">
        이미지 <span className="text-danger">*</span>
      </Label>

      <div className="flex gap-2">
        <div
          onClick={openPicker}
          className="flex items-center gap-2 px-4 py-2.5 w-full bg-sub rounded-lg text-sm  cursor-pointer"
        >
          {previews.length === 0 ? (
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
                    onClick={(e) => {
                      e.stopPropagation()
                      removeImage(idx)
                    }}
                    className="absolute -top-1 -right-1 bg-black/50 text-white size-4 text-xs rounded-full flex items-center justify-center"
                  >
                    <div className="border border-main rounded-full ">
                      <X className="size-3" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button onClick={openPicker} variant="secondary">
          파일 찾기
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
