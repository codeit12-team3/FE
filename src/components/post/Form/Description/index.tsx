'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import { Label, Textarea } from '@/components/ui'
import type { PostFormValues } from '@/types/posts/schema'

export default function Description() {
  const { control, setValue } = useFormContext<PostFormValues>()

  const content = useWatch({ control, name: 'content' }) ?? ''

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Label>모집 설명</Label>
        <span className="text-xs text-gray-500">({content.length}/500)</span>
      </div>
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
        maxLength={500}
      />
    </div>
  )
}
