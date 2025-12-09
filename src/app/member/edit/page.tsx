'use client'

import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { useMyProfileQuery } from '@/api/member/member.queries'
import { ProfileEditForm, ProfileImageEdit } from '@/components/member/edit'
import { useMemberStore } from '@/stores/member.store'

export default function ProfileEditPage() {
  const { data, isLoading, isError, error } = useMyProfileQuery()
  const { setProfile } = useMemberStore()

  useEffect(() => {
    if (data) setProfile(data)
  }, [data, setProfile])

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || '프로필을 불러오지 못했습니다')
    }
  }, [isError, error])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-main" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-danger">다시 시도해주세요</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="font-semibold text-[32px] text-center mb-12">내 프로필</h1>

      <div className="flex justify-center mb-12">
        <ProfileImageEdit />
      </div>

      <div className="flex justify-center">
        <ProfileEditForm />
      </div>
    </div>
  )
}
