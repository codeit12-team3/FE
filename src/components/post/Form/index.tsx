'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import type { Resolver } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreatePost, useDeletePost, useUpdatePost } from '@/api/posts'
import { Button } from '@/components/ui'
import { NATION_CODE_TO_LABEL, NATION_LABEL_TO_CODE } from '@/constants/posts'
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
  const deletePost = useDeletePost()
  const resolver = zodResolver(
    postSchema,
  ) as unknown as Resolver<PostFormWithTagValues>

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
          ageType: initialData.conditions.ageCondition,
          gender: initialData.conditions.genderCondition,
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
    const payload = {
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

    if (isEdit && postId) {
      updatePost.mutate(
        { postId, payload },
        {
          onSuccess: () => {
            toast.success('게시글이 수정되었습니다.')
            router.push(`/posts/${postId}`)
          },
        },
      )
    } else {
      createPost.mutate(payload, {
        onSuccess: () => {
          toast.success('게시글이 등록되었습니다.')
          router.push('/')
        },
      })
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-xl w-full px-4">
        <h1 className="text-2xl font-semibold mb-6 text-left">
          {isEdit ? '게시글 수정' : '게시글 작성'}
        </h1>
      </div>
      <div className="max-w-7xl flex items-center justify-center">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Header />

            <ImageUpload />
            <Info />
            <DateSection />
            <Description />

            <div className="flex items-center gap-8 justify-center my-3">
              {isEdit && postId ? (
                <Button
                  type="button"
                  size="md"
                  variant="destructive"
                  onClick={() => {
                    if (!confirm('정말 삭제하시겠어요?')) return
                    deletePost.mutate(postId, {
                      onSuccess: () => {
                        toast.success('게시글이 삭제되었습니다.')
                        router.push('/')
                      },
                    })
                  }}
                >
                  삭제
                </Button>
              ) : (
                <Button
                  type="button"
                  size="md"
                  variant="secondary"
                  onClick={() => router.push('/')}
                >
                  나가기
                </Button>
              )}

              <Button
                type="submit"
                size="md"
                disabled={!formState.isValid || isPending}
              >
                {isPending
                  ? isEdit
                    ? '수정 중...'
                    : '등록 중...'
                  : isEdit
                    ? '게시글 수정'
                    : '게시글 등록'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
