'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import FormInput from '@/components/form/FormInput'
import type { PostFormValues } from '@/types/posts/schema'

export default function DateSection() {
  const { control } = useFormContext<PostFormValues>()

  const start = useWatch({ control, name: 'startDate' }) as unknown as
    | string
    | undefined
  const end = useWatch({ control, name: 'endDate' }) as unknown as
    | string
    | undefined

  return (
    <div className="flex gap-8">
      <FormInput<PostFormValues>
        label="여행 시작 일시"
        name="startDate"
        type="datetime-local"
        required
        className="w-1/2"
        max={end || undefined}
      />

      <FormInput<PostFormValues>
        label="여행 종료 일시"
        name="endDate"
        type="datetime-local"
        required
        className="w-1/2"
        min={start || undefined}
      />
    </div>
  )
}
