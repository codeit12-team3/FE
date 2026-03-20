'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

import { useCreatePost, useUpdatePost } from '@/features/post/api'
import {
  AGE_LABEL_TO_ENUM,
  GENDER_LABEL_TO_ENUM,
  NATION_CODE_TO_LABEL,
  NATION_LABEL_TO_CODE,
} from '@/features/post/constants'
import { AgeType, GenderType, PostContent } from '@/features/post/types'
import { PostFormWithTagValues, postSchema } from '@/features/post/types/schema'

import FormDescription from './Description/FormDescription'
import FormAction from './FormAction/FormAction'
import FormDateRange from './FormDateRange/FormDateRange'
import FormHeader from './FormHeader/FormHeader'
import ImageUpload from './ImageUpload/ImageUpload'
import TravelInfo from './TravelInfo/TravelInfo'

interface PostFormProps {
  mode: 'add' | 'edit'
  initialData?: PostContent
  postId?: string
}

export default function PostForm({ mode, initialData, postId }: PostFormProps) {
  const router = useRouter()
  const createPost = useCreatePost()
  const updatePost = useUpdatePost()

  const resolver = zodResolver(postSchema)

  const methods = useForm<PostFormWithTagValues>({
    resolver,
    mode: 'onChange',
    defaultValues: initialData
      ? {
          title: initialData.title,
          content: initialData.content,
          nation: NATION_CODE_TO_LABEL[initialData.nation],
          region: initialData.region,
          maxMembers: initialData.stats.maxMembers,
          ageType:
            typeof initialData.conditions.ageCondition === 'string'
              ? AGE_LABEL_TO_ENUM[initialData.conditions.ageCondition]
              : initialData.conditions.ageCondition,
          gender:
            typeof initialData.conditions.genderCondition === 'string'
              ? GENDER_LABEL_TO_ENUM[initialData.conditions.genderCondition]
              : initialData.conditions.genderCondition,
          startDate: initialData.period.startDate,
          endDate: initialData.period.endDate,
          tags: initialData.tags,
          images: initialData.images,
          tag: '',
        }
      : {
          title: '',
          content: '',
          nation: undefined,
          region: '',
          maxMembers: 0,
          ageType: undefined,
          gender: undefined,
          startDate: '',
          endDate: '',
          tags: [],
          images: [],
          tag: '',
        },
  })

  const isEdit = mode === 'edit'
  const isPending = isEdit ? updatePost.isPending : createPost.isPending

  const onSubmit = (data: PostFormWithTagValues) => {
    if (isEdit && postId && initialData) {
      const updatePayload = {
        title: data.title,
        content: data.content,
        nation: NATION_LABEL_TO_CODE[data.nation],
        region: data.region,
        period: {
          startDate: data.startDate,
          endDate: data.endDate,
        },
        maxMembers: Number(data.maxMembers),
        tags: data.tags,
        ageType: data.ageType,
        genderType: data.gender,
        images: {
          add: data.images.filter((img) => !initialData.images.includes(img)),
          delete: initialData.images.filter(
            (img) => !data.images.includes(img),
          ),
        },
      }

      updatePost.mutate(
        { postId, payload: updatePayload },
        {
          onSuccess: () => {
            router.push(`/posts/${postId}`)
          },
        },
      )
    } else {
      const createPayload = {
        title: data.title,
        content: data.content,
        nation: NATION_LABEL_TO_CODE[data.nation],
        region: data.region,
        startDate: data.startDate,
        endDate: data.endDate,
        maxMembers: Number(data.maxMembers),
        tags: data.tags,
        images: data.images ?? [],
        genderType: data.gender as GenderType,
        ageType: data.ageType as AgeType,
      }

      createPost.mutate(createPayload, {
        onSuccess: () => {
          router.push('/')
        },
      })
    }
  }

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <div className=" flex items-center justify-center">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="md:max-w-[475px]  md:mt-10 mt-6 px-4"
          >
            <h1 className="text-lg font-semibold text-left mb-8">
              {isEdit ? '게시글 수정' : '게시글 작성'}
            </h1>
            <FormHeader />
            <ImageUpload />
            <TravelInfo />
            <FormDateRange />
            <FormDescription />
            <FormAction mode={mode} postId={postId} isPending={isPending} />
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
