'use client'

import { CircleAlert } from 'lucide-react'
import { useController, useFormContext } from 'react-hook-form'

import AnimateFieldset from '@/components/auth/AnimateFieldset'
import { GENDER_LIST } from '@/constants/member'
import { cn } from '@/lib/common'
import { SignupFormValues } from '@/types/auth'

interface Props {
  className?: string
}

export default function GenderFieldset({ className }: Props) {
  const { control } = useFormContext<SignupFormValues>()

  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({ name: 'gender', control })

  return (
    <AnimateFieldset className={className}>
      <div className="space-y-2 w-full">
        <legend className="text-base font-medium">성별</legend>
        <div className="flex items-center justify-around space-y-1 py-3 w-full">
          {GENDER_LIST.map((gender, idx) => (
            <label
              key={gender}
              className={cn(
                'flex items-center gap-3 cursor-pointer',
                'px-4 rounded-xl transition-colors',
              )}
            >
              <span
                className={cn(
                  'text-base font-semibold',
                  field.value === gender ? 'text-text-base' : 'text-text-input',
                )}
              >
                {GENDER_LIST[idx] === 'male' ? '남자' : '여자'}
              </span>
              <input
                type="radio"
                value={gender}
                checked={field.value === gender}
                onChange={(e) => field.onChange(e.target.value)}
                name={field.name}
                ref={ref}
                className="sr-only"
              />
              <span
                className={cn(
                  'size-6 rounded-full border flex items-center justify-center border-text-input',
                )}
              >
                {field.value === gender && (
                  <span className="size-3 rounded-full bg-main" />
                )}
              </span>
            </label>
          ))}
        </div>
        <p className="h-6 flex text-xs text-danger items-center gap-1 px-4">
          {error && <CircleAlert className="size-4" />}
          {error?.message}
        </p>
      </div>
    </AnimateFieldset>
  )
}
