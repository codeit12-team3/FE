import Image from 'next/image'
import { useRef, useState } from 'react'

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
  return (
    <div>
      <label className="block text-sm text-text-base mb-3">
        이미지 <span className="text-danger">*</span>
      </label>

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

        <button
          onClick={openPicker}
          className=" p-2.5 w-25 border border-main text-main rounded-lg text-sm hover:bg-blue-50"
        >
          파일 찾기
        </button>

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
