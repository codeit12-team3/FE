'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useUpdateMyProfile } from '@/api/member'
import { Button } from '@/components/common/Button'
import { useMemberStore } from '@/stores/member.store'

export default function FormActionBtn() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { isDirty, isSubmitting, setSubmitting, setDirty, getUpdatePayload } =
    useMemberStore()
  const { mutate: updateProfile, isPending } = useUpdateMyProfile()
  const isLoading = isPending || isSubmitting

  const handleSave = () => {
    const payload = getUpdatePayload()

    setSubmitting(true)

    updateProfile(payload, {
      onSuccess: () => {
        toast.success('프로필이 저장되었습니다!')
        setSubmitting(false)
        setDirty(false)
        queryClient.invalidateQueries({ queryKey: ['myProfile'] })
        router.back()
      },
      onError: (error) => {
        console.error(error)
        toast.error('저장에 실패했습니다')
        setSubmitting(false)
      },
    })
  }
  return (
    <div className="flex justify-center gap-7 my-20">
      <Button
        variant="secondary"
        size="md"
        className="w-[185px] text-lg font-extrabold cursor-pointer"
        onClick={() => router.back()}
      >
        나가기
      </Button>
      <Button
        size="md"
        className="w-[185px] text-lg font-extrabold cursor-pointer"
        onClick={handleSave}
        disabled={!isDirty || isLoading}
      >
        프로필 수정하기
      </Button>
    </div>
  )
}
