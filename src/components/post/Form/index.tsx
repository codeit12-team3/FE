'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreatePost, useUpdatePost } from '@/api/posts'
import { Button } from '@/components/ui'
import {
  AGE_LABEL_TO_ENUM,
  GENDER_LABEL_TO_ENUM,
  NATION_CODE_TO_LABEL,
  NATION_LABEL_TO_CODE,
} from '@/constants/posts'
import { AgeType, GenderType, PostContent } from '@/types/posts'
import { PostFormWithTagValues, postSchema } from '@/types/posts/schema'

import DateSection from './Date'
import Description from './Description'
import Header from './Header'
import ImageUpload from './ImageUpload'
import Info from './Info'

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
  console.log('initialData:', initialData)
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

  const { formState } = methods

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
            toast.success('게시글이 수정되었습니다.')
            window.location.href = `/posts/${postId}`
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
          toast.success('게시글이 등록되었습니다.')
          router.push('/')
        },
      })
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className=" flex items-center justify-center">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="max-w-[475px]"
          >
            <h1 className="text-lg font-semibold text-left mb-8">
              {isEdit ? '게시글 수정' : '게시글 작성'}
            </h1>
            <Header />
            <ImageUpload />
            <Info />
            <DateSection />
            <Description />
            <div className="flex items-center gap-8 justify-center my-8">
              {isEdit && postId ? (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    router.push(`/posts/${postId}`)
                  }}
                  className="flex-1"
                >
                  뒤로가기
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => router.push('/')}
                  className="flex-1 border border-text-disabled "
                >
                  나가기
                </Button>
              )}

              <Button
                type="submit"
                size="sm"
                disabled={!formState.isValid || isPending}
                className="flex-1"
              >
                {isPending
                  ? isEdit
                    ? '수정 중...'
                    : '등록 중...'
                  : isEdit
                    ? '수정하기'
                    : '등록하기'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
