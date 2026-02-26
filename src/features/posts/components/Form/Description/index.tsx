'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import { Label, Textarea } from '@/components/ui'
import type { PostFormValues } from '@/features/posts/types/schema'

export default function Description() {
  const { control, setValue } = useFormContext<PostFormValues>()

  const content = useWatch({ control, name: 'content' }) ?? ''

  return (
    <div>
      <Label>모집 설명</Label>

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
        className="max-h-[120px] resize-none overflow-y-auto [field-sizing:initial]"
      />
      <div className="flex justify-end pt-1">
        <span className="text-xs  text-gray-500">({content.length}/500)</span>
      </div>
    </div>
  )
}
