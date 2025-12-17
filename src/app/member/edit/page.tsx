'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useMyProfileQuery } from '@/api/member/member.queries'
import { ProfileEditForm, ProfileImageEdit } from '@/components/member/edit'
import { ProfileEditFormData, profileEditSchema } from '@/types/member/schema'

export default function ProfileEditPage() {
  const { data, isLoading, isError } = useMyProfileQuery()

  const methods = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      email: '',
      image: '',
      nickname: '',
      birth: '',
      gender: '',
      mbti: '',
      lodgingStyle: '',
      tripStyle: '',
      introduction: '',
    },
  })

  useEffect(() => {
    if (data) {
      methods.reset({
        email: data.email || '',
        image: data.image || '',
        nickname: data.nickname || '',
        birth: data.birth || '',
        gender: data.gender,
        mbti: data.mbti || '',
        lodgingStyle: data.lodgingStyle || 'ALL',
        tripStyle: data.tripStyle || 'ALL',
        introduction: data.introduction || '',
      })
    }
  }, [data, methods])

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

  console.log(data)

  return (
    <FormProvider {...methods}>
      <div className="w-119 mx-auto ">
        <h1 className="font-semibold text-[32px] text-center mb-12">
          내 프로필
        </h1>
        <div className="flex justify-center mb-12">
          <ProfileImageEdit />
        </div>
        <div className="w-inherit">
          <ProfileEditForm />
        </div>
      </div>
    </FormProvider>
  )
}
