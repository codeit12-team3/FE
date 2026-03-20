'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import FormDatePicker from '@/components/form/FormDatePicker'
import type { PostFormValues } from '@/features/post/types/schema'

export default function FormDateRange() {
  const { control } = useFormContext<PostFormValues>()

  const start = useWatch({ control, name: 'startDate' }) as unknown as
    | string
    | undefined
  const end = useWatch({ control, name: 'endDate' }) as unknown as
    | string
    | undefined

  return (
    <div className="flex gap-8">
      <FormDatePicker<PostFormValues>
        label="여행 시작 일시"
        name="startDate"
        required
        className="w-1/2"
        maxDate={end ? new Date(end) : undefined}
      />

      <FormDatePicker<PostFormValues>
        label="여행 종료 일시"
        name="endDate"
        required
        className="w-1/2"
        minDate={start ? new Date(start) : undefined}
      />
    </div>
  )
}
