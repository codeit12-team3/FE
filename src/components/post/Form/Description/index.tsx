'use client'

import { useFormContext } from 'react-hook-form'

import { Label, Textarea } from '@/components/ui'
import type { PostFormValues } from '@/types/posts/schema'

export default function Description() {
  const { watch, setValue } = useFormContext<PostFormValues>()

  const content = watch('content') ?? ''

  return (
    <div>
      <Label className="mb-2">모집 설명</Label>
      <Textarea
        value={content}
        onChange={(e) =>
          setValue('content', e.target.value, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        rows={4}
        placeholder="모집 설명을 입력해주세요"
      />
    </div>
  )
}
