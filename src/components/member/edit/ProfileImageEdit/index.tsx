'use client'

import { LoaderCircle, Pencil } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

export default function ProfileImageEdit() {
  const [imageUrl, setImageUrl] = useState('/images/profile_default.svg')
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEditClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('JPG, PNG, WebP, HEIC만 업로드 가능해요!')
      e.target.value = ''
      return
    }

    setIsLoading(true)
    const loadingToast = toast.loading('이미지 처리 중...')

    setTimeout(() => {
      const preview = URL.createObjectURL(file)
      setImageUrl(preview)
      setIsLoading(false)

      toast.dismiss(loadingToast)
      toast.success('프로필 사진이 변경되었습니다!', {
        description: '이제 다른 정보도 수정하고 저장해보세요',
        duration: 4000,
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <div className="relative group">
        <div className="relative w-[173px] h-[173px] rounded-full overflow-hidden border-2 border-[#DDDDDD]">
          <Image
            fill
            src={imageUrl}
            className="object-cover"
            alt="프로필 이미지"
            priority
          />

          {isLoading && (
            <div className="absolute inset-0 bg-black/70 rounded-full flex flex-col items-center justify-center gap-3">
              <LoaderCircle size={48} className="text-white animate-spin" />
            </div>
          )}
        </div>

        <button
          onClick={handleEditClick}
          disabled={isLoading}
          className="absolute w-12 h-12 border-2 border-[#dddddd] rounded-full flex items-center justify-center bg-white bottom-0 right-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed
                     "
        >
          <Pencil size={24} className="text-gray-700" />
        </button>
      </div>

      <h2 className="text-2xl font-bold text-black">나의닉네임</h2>

      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
