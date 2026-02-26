'use client'

import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui'
import { PostFormWithTagValues } from '@/features/posts/types/schema'

interface FormActionProps {
  mode: 'add' | 'edit'
  postId?: string
  isPending: boolean
}

export default function FormAction({
  mode,
  postId,
  isPending,
}: FormActionProps) {
  const router = useRouter()
  const { formState } = useFormContext<PostFormWithTagValues>()

  const isEdit = mode === 'edit'

  return (
    <div className="flex items-center gap-8 justify-center my-8">
      {isEdit && postId ? (
        <Button
          type="button"
          variant="tertiary"
          size="md"
          onClick={() => {
            router.back()
          }}
          className="flex-1"
        >
          뒤로가기
        </Button>
      ) : (
        <Button
          type="button"
          variant="tertiary"
          size="md"
          onClick={() => router.push('/')}
          className="flex-1 border border-text-disabled "
        >
          나가기
        </Button>
      )}

      <Button
        type="submit"
        size="md"
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
  )
}
