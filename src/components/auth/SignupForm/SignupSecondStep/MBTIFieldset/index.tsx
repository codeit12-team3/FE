'use client'

import { CircleAlert } from 'lucide-react'
import { useController, useFormContext } from 'react-hook-form'

import AnimateFieldset from '@/components/auth/AnimateFieldset'
import { Label, Select } from '@/components/common'
import { MBTI_LIST } from '@/constants/member'
import { SignupFormValues } from '@/types/auth'

interface Props {
  className?: string
}

export default function MBTIFieldset({ className }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignupFormValues>()

  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({ name: 'mbti', control })

  return (
    <AnimateFieldset className={className}>
      <legend className="sr-only">MBTI 선택</legend>
      <div className="space-y-2 w-full">
        <Label htmlFor={'mbti'}>MBTI</Label>
        <div className="space-y-1 w-full">
          <Select
            ref={ref}
            value={field.value}
            onValueChange={field.onChange}
            selectProps={{
              id: 'mbti',
              name: field.name,
              onBlur: field.onBlur,
              onChange: (e) => field.onChange(e.target.value),
            }}
          >
            <Select.Trigger aria-invalid={!!errors.mbti}>
              <Select.Value placeholder="MBTI를 선택해주세요" />
            </Select.Trigger>
            <Select.Content>
              {MBTI_LIST.map((mbti) => (
                <Select.Item key={mbti} value={mbti}>
                  {mbti}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>
        <p className="h-6 flex text-xs text-danger items-center gap-1 px-4">
          {error && <CircleAlert className="size-4" />}
          {error?.message}
        </p>
      </div>
    </AnimateFieldset>
  )
}
