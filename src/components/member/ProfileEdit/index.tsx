'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as m from 'motion/react-m'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useMyProfileQuery } from '@/api/member'
import { FADE_IN, SLIDE_UP } from '@/constants/animation'
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
      <m.div {...FADE_IN} className="flex justify-center mb-6">
        <ProfileImageEdit />
      </m.div>
      <m.div {...SLIDE_UP} className="w-inherit">
        <ProfileEditForm />
      </m.div>
    </FormProvider>
  )
}
