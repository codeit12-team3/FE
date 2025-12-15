'use client'

import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { deleteUnusedImage, uploadImage } from '@/api/member'
import useImageCompress from '@/hooks/member/useImageCompress'
import { ProfileEditFormData } from '@/types/member/schema'

export default function ProfileImageEdit() {
  const { setValue, watch } = useFormContext<ProfileEditFormData>()
  const imageValue = watch('image')

  const [profileImg, setProfileImg] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { compress } = useImageCompress()

  const uploadedImagePathRef = useRef<string | null>(null)
  const originalImagePathRef = useRef<string | null>(null)

  useEffect(() => {
    if (imageValue && !imageValue.startsWith('blob:')) {
      setProfileImg(imageValue)
      originalImagePathRef.current = imageValue
    }
  }, [imageValue])

  useEffect(() => {
    return () => {
      const uploadedPath = uploadedImagePathRef.current
      const originalPath = originalImagePathRef.current

      if (uploadedPath && uploadedPath !== originalPath) {
        deleteUnusedImage(uploadedPath).catch((error) => {
          console.error('이미지삭제실패', error)
        })
      }

      if (profileImg?.startsWith('blob:')) {
        URL.revokeObjectURL(profileImg)
      }
    }
  }, [profileImg])

  const handleEditClick = () => {
    fileInputRef.current?.click()
  }

  const getImageType = (file: File): 'JPG' | 'PNG' | 'SVG' | null => {
    const extension = file.name.split('.').pop()?.toUpperCase()
    if (extension === 'JPG' || extension === 'JPEG') return 'JPG'
    if (extension === 'PNG') return 'PNG'
    if (extension === 'SVG') return 'SVG'
    return null
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log('📁 선택된 파일:', file.name, file.size, file.type)

    const imageType = getImageType(file)
    if (!imageType) {
      toast.error('JPG, JPEG, PNG, SVG만 업로드 가능해요!')
      e.target.value = ''
      return
    }

    console.log('✅ 허용된 이미지 타입:', imageType)

    try {
      setIsUploading(true)

      let uploadFile: File | Blob = file
      let previewUrl: string

      if (imageType === 'SVG') {
        uploadFile = file
        previewUrl = URL.createObjectURL(file)
        console.log('🖼️ SVG는 압축 스킵, 프리뷰 URL 생성')
      } else {
        console.log('🗜️ 이미지 압축 시작...')
        const compressed = await compress(file)
        uploadFile = compressed.file
        previewUrl = compressed.previewUrl
        console.log('✅ 압축 완료:', {
          originalSize: file.size,
          compressedSize: compressed.file.size,
          ratio:
            (((file.size - compressed.file.size) / file.size) * 100).toFixed(
              2,
            ) + '% 감소',
        })
      }

      setProfileImg(previewUrl)

      // 이전 업로드된 이미지 정리
      const previousUploadedPath = uploadedImagePathRef.current
      if (
        previousUploadedPath &&
        previousUploadedPath !== originalImagePathRef.current
      ) {
        console.log('🗑️ 이전 임시 이미지 삭제 시도:', previousUploadedPath)
        await deleteUnusedImage(previousUploadedPath).catch((error) => {
          console.error('❌ 이전 이미지 삭제 실패:', error)
        })
      }

      console.log('🔗 Presigned URL 요청 시작...')
      const imagePath = await uploadImage(uploadFile, imageType, 'MEMBER')
      console.log('🎉 업로드 성공! 반환된 이미지 경로:', imagePath)

      setValue('image', imagePath, { shouldDirty: true })
      uploadedImagePathRef.current = imagePath

      toast.success('프로필 사진이 변경되었습니다!', { duration: 2000 })
    } catch (err) {
      console.error('💥 이미지 업로드 전체 과정 실패:', err)

      setProfileImg(imageValue || null)
      toast.error('이미지 업로드 중 오류가 발생했습니다')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }
  return (
    <div className="relative group">
      <div className="relative w-[173px] h-[173px] rounded-full overflow-hidden border-2 border-[#DDDDDD] bg-gray-50">
        <Image
          fill
          src={profileImg || '/images/profile_default.svg'}
          className="object-cover"
          alt="프로필 이미지"
          priority
        />
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-sm">업로드 중...</div>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handleEditClick}
        disabled={isUploading}
        className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-full border-2 border-[#dddddd] flex items-center justify-center shadow-lg cursor-pointer transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Pencil size={24} className="text-gray-700" />
      </button>
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/svg+xml"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
