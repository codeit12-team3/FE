'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { useUpdateMyProfile } from '@/api/member'
import { Button } from '@/components/ui/button'
import { UpdateMyProfileReq } from '@/types/member'
import { ProfileEditFormData } from '@/types/member/schema'

export default function FormActionBtn() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<ProfileEditFormData>()

  const { mutate: updateProfile, isPending } = useUpdateMyProfile()

  const isLoading = isPending || isSubmitting

  const onSubmit = (data: ProfileEditFormData) => {
    const payload: UpdateMyProfileReq = {
      image: data.image || 'ALL',
      nickname: data.nickname || 'ALL',
      birth: data.birth || 'ALL',
      gender: data.gender || 'ALL',
      mbti: data.mbti || 'ALL',
      lodgingStyle: data.lodgingStyle || 'ALL',
      tripStyle: data.tripStyle || 'ALL',
      introduction: data.introduction || 'ALL',
    }

    updateProfile(payload, {
      onSuccess: () => {
        toast.success('프로필이 저장되었습니다!')
        queryClient.invalidateQueries({ queryKey: ['myProfile'] })
        router.back()
      },
      onError: (error) => {
        console.error(error)
        toast.error('저장에 실패했습니다')
      },
    })
  }

  return (
    <div className="flex justify-center gap-7 my-20">
      <Button
        type="button"
        variant="secondary"
        size="md"
        className="w-[185px] text-lg font-extrabold"
        onClick={() => {
          router.back()
        }}
      >
        나가기
      </Button>
      <Button
        type="button"
        size="md"
        className="w-[185px] text-lg font-extrabold"
        onClick={handleSubmit(onSubmit)}
        disabled={!isDirty || isLoading}
      >
        프로필 수정하기
      </Button>
    </div>
  )
}
