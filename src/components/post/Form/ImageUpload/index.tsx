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

    const newUrls = [...previews]

    Array.from(files).forEach((file) => {
      if (newUrls.length >= 3) return
      newUrls.push(URL.createObjectURL(file))
    })

    setPreviews(newUrls)
  }
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previews])
  return (
    <div>
      <Label className=" mb-2">
        이미지 <span className="text-danger">*</span>
      </Label>

      <div className="flex justify-between gap-2 ">
        <div
          onClick={openPicker}
          className="flex items-center px-4 py-2.5 w-full bg-[#EDF4FB] rounded-lg text-sm text-text-input cursor-pointer overflow-hidden "
        >
          {previews.length === 0 ? (
            <span className="text-text-input leading-6">
              최대 3장, 5MB 제한
            </span>
          ) : (
            <div className="flex gap-2">
              {previews.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt="preview"
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
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
