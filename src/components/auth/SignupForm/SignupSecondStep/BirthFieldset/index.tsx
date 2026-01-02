'use client'

import { CircleAlert } from 'lucide-react'
import { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'

import { AnimateFieldset } from '@/components/auth/form'
import FormDatePicker from '@/components/form/FormDatePicker'
import { SignupFormValues } from '@/types/auth'

type Props = ComponentProps<typeof AnimateFieldset>

export default function BirthFieldset(props: Props) {
  const {
    formState: { errors },
  } = useFormContext<SignupFormValues>()

  return (
    <AnimateFieldset {...props}>
      <FormDatePicker label="생년월일 선택" name="birth" required />
      <p className="h-6 flex text-xs text-red items-center gap-1 px-4">
        {errors.birth && <CircleAlert className="size-4" />}
        <span>{errors.birth?.message}</span>
      </p>
    </AnimateFieldset>
  )
}
