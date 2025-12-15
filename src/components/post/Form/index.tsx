'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import type { Resolver } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreatePost } from '@/api/posts'
import { Button } from '@/components/common'
import { AgeType, GenderType } from '@/types/posts'
import { PostFormWithTagValues, postSchema } from '@/types/posts/schema'

import DateSection from './Date'
import Description from './Description'
import Header from './Header'
import ImageUpload from './ImageUpload'
import Info from './Info'

export default function PostForm() {
  const router = useRouter()
  const { mutate, isPending } = useCreatePost()
  const resolver = zodResolver(
    postSchema,
  ) as unknown as Resolver<PostFormWithTagValues>
  const methods = useForm<PostFormWithTagValues>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      nation: '',
      region: '',
      member: 0,
      ageType: undefined,
      gender: undefined,
      startDate: '',
      endDate: '',
      tags: [],
      images: [],
      tag: '',
    },
  })

  const { formState } = methods

  const onSubmit = (data: PostFormWithTagValues) => {
    const payload = {
      title: data.title,
      content: data.description,
      nation: data.nation,
      region: data.region,
      startDate: data.startDate,
      endDate: data.endDate,
      maxMembers: Number(data.member),
      tags: data.tags,
      images: data.images ?? [],
      genderType: data.gender as GenderType,
      ageType: data.ageType as AgeType,
    }

    mutate(payload, {
      onSuccess: () => {
        toast.success('게시글이 등록되었습니다.')
        router.push('/')
      },
    })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-7xl w-full px-8">
        <h1 className="text-2xl font-semibold mb-6 text-left">게시글 작성</h1>
      </div>
      <div className="max-w-7xl flex items-center justify-center">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Header />

            <ImageUpload />
            <Info />
            <DateSection />
            <Description />

            <div className="flex items-center gap-8 justify-center mt-6">
              <Button
                type="button"
                size="md"
                variant="secondary"
                onClick={() => router.push('/')}
              >
                나가기
              </Button>
              <Button
                type="submit"
                size="md"
                disabled={!formState.isValid || isPending}
              >
                {isPending ? '등록 중...' : '게시글 등록'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
