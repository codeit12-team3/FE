'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useMyProfileQuery } from '@/api/member'
import { ProfileEditFormData, profileEditSchema } from '@/types/member'

import { ProfileEditForm, ProfileImageEdit } from '../edit'

export default function ProfileEdit() {
  const { data } = useMyProfileQuery()

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

  return (
    <FormProvider {...methods}>
      <div className="flex justify-center mb-6">
        <ProfileImageEdit />
      </div>
      <div className="w-inherit">
        <ProfileEditForm />
      </div>
    </FormProvider>
  )
}
