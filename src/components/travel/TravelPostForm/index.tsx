'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

export default function TravelPostForm() {
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
    <div className="space-y-2.5">
      <div>
        <label className="block text-sm text-text-base mb-2">
          모임 이름 <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          placeholder="모임 이름을 작성해주세요"
          className="w-full px-4 py-2.5 rounded-lg text-sm bg-[#EDF4FB] placeholder:text-text-input outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">
          여행 테마 <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          placeholder="태그로 선택해주세요, 최대 5개"
          className="w-full px-4 py-2.5 rounded-lg text-sm bg-[#EDF4FB] placeholder:text-text-input outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-text-base mb-3">
          이미지 <span className="text-danger">*</span>
        </label>

        <div className="flex justify-between gap-2">
          <div
            onClick={openPicker}
            className="flex items-center px-4 py-2.5 w-full bg-[#EDF4FB] rounded-lg text-sm text-text-input cursor-pointer overflow-hidden"
          >
            {previews.length === 0 ? (
              <span className="text-text-input leading-6">
                최대 3장, 5MB 제한
              </span>
            ) : (
              <div className="flex gap-2">
                {previews.map((src, idx) => (
                  <Image
                    key={idx}
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
            className="px-4 py-2.5 w-25 border border-main text-main rounded-lg text-sm hover:bg-blue-50"
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

      <div>
        <label className="block text-sm text-text-base mb-3">
          국가 <span className="text-danger">*</span>
        </label>

        <div className="relative">
          <select className="w-full px-4 py-2.5 rounded-lg text-sm text-text-input appearance-none bg-[#EDF4FB] outline-none">
            <option>국가를 선택해주세요</option>
          </select>

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-input pointer-events-none">
            ▼
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">
          모집 정원 <span className="text-danger">*</span>
        </label>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="인원을 입력해주세요"
            className="w-1/2 px-4 py-2.5 rounded-lg text-sm bg-[#EDF4FB] placeholder:text-text-input outline-none"
          />

          <label className="flex items-center gap-2">
            <input type="radio" name="gender" className="accent-main" />
            <span className="text-sm text-text-base">남성만</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="gender" className="accent-main" />
            <span className="text-sm text-text-base">여성만</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="gender" className="accent-main" />
            <span className="text-sm text-text-base">모두</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">
          나이 <span className="text-danger">*</span>
        </label>

        <div className="flex gap-3 items-center">
          <select className="flex-1 px-4 py-2.5 rounded-lg text-sm text-text-input appearance-none bg-[#EDF4FB] outline-none">
            <option>출생년도 선택해주세요</option>
          </select>

          <label className="flex items-center gap-2">
            <input type="radio" name="age" className="accent-main" />
            <span className="text-sm text-text-base">이상</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="age" className="accent-main" />
            <span className="text-sm text-text-base">이하</span>
          </label>
        </div>
      </div>

      <div className="flex justify-between mb-2">
        <div className="flex flex-col">
          <label className="text-sm text-text-base mb-2">
            여행 시작 일시 <span className="text-danger">*</span>
          </label>
          <input
            type="datetime-local"
            className="px-4 py-2.5 rounded-lg text-sm bg-[#EDF4FB] outline-none text-text-base"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-text-base mb-2">
            여행 종료 일시 <span className="text-danger">*</span>
          </label>
          <input
            type="datetime-local"
            className="px-4 py-2.5 rounded-lg text-sm bg-[#EDF4FB] outline-none text-text-base"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">
          모집 설명 (0/500)
        </label>
        <textarea
          rows={4}
          placeholder="모집 설명을 입력해주세요"
          className="w-full px-4 py-2.5 rounded-lg text-sm resize-none bg-[#EDF4FB] outline-none placeholder:text-text-input"
        />
      </div>

      <button className="w-full py-2.5 rounded-lg font-medium bg-bg-disabled text-text-disabled">
        게시하기
      </button>
    </div>
  )
}
