'use client'

import { CircleAlert } from 'lucide-react'
import { ComponentProps } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { AnimateFieldset } from '@/components/auth/form'
import { Label, RadioGroup, RadioGroupItem } from '@/components/ui'
import { GENDER_LIST, GENDER_MAP } from '@/constants/member'
import { AdditionalFormValues } from '@/types/auth'

type Props = ComponentProps<typeof AnimateFieldset>

export default function GenderFieldset(props: Props) {
  const { control } = useFormContext<AdditionalFormValues>()

  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({ name: 'gender', control })

  return (
    <AnimateFieldset {...props}>
      <div className="space-y-2 w-full">
        <Label>
          <legend>성별</legend>
          <span className="text-blue-500">*</span>
        </Label>
        <RadioGroup
          className="flex items-center gap-14 px-4"
          ref={ref}
          onValueChange={field.onChange}
        >
          {GENDER_LIST.map((gender) => (
            <div className="flex items-center gap-3" key={`gender-${gender}`}>
              <Label htmlFor={`gender-${gender}`}>{GENDER_MAP[gender]}</Label>
              <RadioGroupItem id={`gender-${gender}`} value={gender} />
            </div>
          ))}
        </RadioGroup>
        <p className="h-6 flex text-xs text-danger items-center gap-1 px-4">
          {error && <CircleAlert className="size-4" />}
          {error?.message}
        </p>
      </div>
    </AnimateFieldset>
  )
}
