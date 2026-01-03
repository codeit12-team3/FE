'use client'

import { CircleAlert } from 'lucide-react'
import { ComponentProps } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { AnimateFieldset } from '@/components/auth/form'
import { FormSelect } from '@/components/form'
import { Label } from '@/components/ui'
import { MBTI_LIST } from '@/constants/member'
import { AdditionalFormValues } from '@/types/auth'

type Props = ComponentProps<typeof AnimateFieldset>

export default function MBTIFieldset(props: Props) {
  const { control } = useFormContext<AdditionalFormValues>()

  const {
    field,
    fieldState: { error },
  } = useController({ name: 'mbti', control })

  return (
    <AnimateFieldset {...props}>
      <legend className="sr-only">MBTI 선택</legend>
      <div className="space-y-2 w-full">
        <Label htmlFor={'mbti'}>
          MBTI
          <span className="text-blue-500">*</span>
        </Label>
        <div className="space-y-1 w-full">
          <FormSelect
            className="w-full"
            name={field.name}
            options={MBTI_LIST}
            placeholder="MBTI를 선택하세요"
          />
          <p className="h-6 flex text-xs text-danger items-center gap-1 px-4">
            {error && <CircleAlert className="size-4" />}
            {error?.message}
          </p>
        </div>
      </div>
    </AnimateFieldset>
  )
}
