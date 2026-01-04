'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'

import { useUpdateMyProfile } from '@/api/member'
import { toast } from '@/components/common'
import { Button } from '@/components/ui'
import { UpdateMyProfileReq } from '@/types/member'
import { ProfileEditFormData } from '@/types/member/schema'

export default function FormActionBtn() {
  const router = useRouter()
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<ProfileEditFormData>()

  const { mutate: updateProfile, isPending } = useUpdateMyProfile()
  const { data: session, update } = useSession()

  const isLoading = isPending || isSubmitting

  const onSubmit = (data: ProfileEditFormData) => {
    const payload: UpdateMyProfileReq = {
      image: data.image || '',
      nickname: data.nickname || '',
      birth: data.birth || '',
      gender: data.gender || '',
      mbti: data.mbti || '',
      lodgingStyle: data.lodgingStyle || 'ALL',
      tripStyle: data.tripStyle || 'ALL',
      introduction: data.introduction || '',
    }

    updateProfile(payload, {
      onSuccess: async () => {
        toast.success('프로필이 저장되었습니다!')

        await update({
          user: {
            ...session?.user,
            nickname: payload.nickname,
            birth: payload.birth,
            gender: payload.gender,
            mbti: payload.mbti,
            image: payload.image,
          },
        })

        router.back()
      },
      onError: (error) => {
        console.error(error)
        toast.error('저장에 실패했습니다')
      },
    })
  }

  return (
    <div className="flex justify-center gap-4 mt-3">
      <Button
        type="button"
        variant="tertiary"
        size="md"
        className="flex-1"
        onClick={() => {
          router.back()
        }}
      >
        취소
      </Button>
      <Button
        type="button"
        size="md"
        className="flex-1"
        onClick={handleSubmit(onSubmit)}
        disabled={!isDirty || isLoading}
      >
        수정하기
      </Button>
    </div>
  )
}
