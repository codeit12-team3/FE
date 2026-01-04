'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { uploadMemberImage } from '@/api/images/images.client'
import { IconPencil } from '@/assets/svgr'
import { toast } from '@/components/common'
import useImageCompress from '@/hooks/member/useImageCompress'
import { getImageUrl } from '@/lib/common'
import { ProfileEditFormData } from '@/types/member/schema'

export default function ProfileImageEdit() {
  const { setValue, control } = useFormContext<ProfileEditFormData>()

  const imageValue = useWatch({
    control,
    name: 'image',
  })

  const [profileImg, setProfileImg] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { compress } = useImageCompress('profile')

  // 폼의 image 값이 변경되면 프로필 이미지 상태 업데이트
  useEffect(() => {
    if (imageValue && !imageValue.startsWith('blob:')) {
      setProfileImg(imageValue)
    }
  }, [imageValue])

  // 컴포넌트 언마운트 시 blob URL 메모리 해제
  useEffect(() => {
    return () => {
      if (profileImg?.startsWith('blob:')) {
        URL.revokeObjectURL(profileImg)
      }
    }
  }, [profileImg])

  // 파일 input 클릭 트리거
  const handleEditClick = () => {
    fileInputRef.current?.click()
  }

  /**
   * 파일 확장자를 기반으로 이미지 타입 추출
   */
  const getImageType = (file: File): 'JPEG' | 'PNG' | 'WEBP' | null => {
    const mimeType = file.type.split('/')[1]?.toUpperCase()
    if (mimeType === 'JPEG') return 'JPEG'
    if (mimeType === 'PNG') return 'PNG'
    if (mimeType === 'WEBP') return 'WEBP'
    return null
  }

  /**
   * 이미지 파일 선택 및 업로드 처리
   * 1. 파일 타입 검증
   * 2. 이미지 압축
   * 3. S3 업로드
   * 4. 폼 상태 업데이트
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const imageType = getImageType(file)

    if (!imageType) {
      toast.error('JPG, JPEG, PNG, WEBP만 업로드 가능해요!')
      e.target.value = ''
      return
    }

    try {
      setIsUploading(true)

      // 이미지 압축 처리
      const compressed = await compress(file)
      const uploadFile = compressed.file
      const previewUrl = compressed.previewUrl

      // 프리뷰 이미지 즉시 표시
      setProfileImg(previewUrl)

      const imagePath = await uploadMemberImage(uploadFile, imageType, 'MEMBER')
      setValue('image', imagePath, { shouldDirty: true })

      toast.success('프로필 사진이 변경되었습니다!')
    } catch (err) {
      setProfileImg(imageValue || null)
      toast.error('이미지 업로드 중 오류가 발생했습니다')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="relative group">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200 bg-white">
        <Image
          fill
          src={
            profileImg?.startsWith('blob:')
              ? profileImg
              : getImageUrl(profileImg, true) // 서버 이미지 경로
          }
          className="object-cover"
          alt="프로필 이미지"
          priority
        />
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleEditClick}
        disabled={isUploading}
        className="absolute bottom-2 -right-0.5 size-6 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-full flex items-center justify-center cursor-pointer transition-all"
      >
        <IconPencil className="size-4" />
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
