'use client'

import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import useImageCompress from '@/hooks/member/useImageCompress'
import { MemberEditState } from '@/stores/member.store'

export default function ProfileImageEdit() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { compress } = useImageCompress()
  const { setUploadedImageUrl, setIsUploadingImage } = MemberEditState()

  const handleEditClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('JPG, JPEG, PNG, WebP만 업로드 가능해요!')
      e.target.value = ''
      return
    }

    try {
      console.log(file)
      const result = await compress(file)
      console.log('압축됨', result)
      setPreviewUrl(result.previewUrl)
      setIsUploadingImage(true)

      // 백에서 프리사인드URL나오면 S3 업로드 처리할예정입니다
      toast.success('프로필 사진이 변경되었습니다!', {
        duration: 2000,
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsUploadingImage(false)
      e.target.value = ''
    }
  }

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className="relative group">
      <div className="relative w-[173px] h-[173px] rounded-full overflow-hidden border-2 border-[#DDDDDD] bg-gray-50">
        <Image
          fill
          src={previewUrl || '/images/profile_default.svg'}
          className="object-cover"
          alt="프로필 이미지"
          priority
        />
      </div>

      <button
        onClick={handleEditClick}
        className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-full border-2 border-[#dddddd] flex items-center justify-center shadow-lg cursor-pointer transition-all hover:scale-110 active:scale-95"
      >
        <Pencil size={24} className="text-gray-700" />
      </button>

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
