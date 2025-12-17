'use client'

import { useMemo } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import FormInput from '@/components/form/FormInput'
import FormSelect from '@/components/form/FormSelect'
import { Label, RadioGroup, RadioGroupItem } from '@/components/ui'
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  NATION_OPTIONS,
  REGION_OPTIONS,
} from '@/constants/posts'
import { PostFormValues } from '@/types/posts/schema'

export default function Info() {
  const { control } = useFormContext<PostFormValues>()
  const selectedNation = useWatch({ control, name: 'nation' })
  const cityOptions = useMemo(() => {
    if (!selectedNation) return []
    return (
      (REGION_OPTIONS as Record<string, readonly string[]>)[selectedNation] ||
      []
    )
  }, [selectedNation])
  return (
    <div>
      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <Label htmlFor="nation" className="mb-2">
            국가 <span className="text-destructive">*</span>
          </Label>
          <FormSelect
            name="nation"
            options={NATION_OPTIONS}
            placeholder="국가를 선택해주세요"
            className="w-full"
          />
        </div>

        <div className="w-1/2">
          <Label htmlFor="region" className="mb-2">
            도시 <span className="text-destructive">*</span>
          </Label>
          <FormSelect
            name="region"
            options={cityOptions}
            placeholder="도시를 선택해주세요"
            className="w-full"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <FormInput
          label="모집 정원"
          type="number"
          name="maxMembers"
          placeholder="인원을 입력해주세요"
          className="w-1/2"
          onFocus={(e) => {
            if (e.currentTarget.value === '0') {
              e.currentTarget.value = ''
            }
          }}
          required
        />
        <div className="w-1/2">
          <Label htmlFor="ageType" className="mb-2">
            나이 <span className="text-destructive">*</span>
          </Label>
          <FormSelect
            name="ageType"
            options={AGE_OPTIONS}
            placeholder="나이를 선택해주세요"
            className="w-full"
          />
        </div>
      </div>
      <div className="mb-6">
        <Label htmlFor="gender" className="mb-2">
          성별<span className="text-destructive">*</span>
        </Label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value ?? ''}
              onValueChange={field.onChange}
              className="flex gap-3 items-center"
            >
              {GENDER_OPTIONS.map((opt) => (
                <Label key={opt.value} className="flex items-center gap-3">
                  <RadioGroupItem value={opt.value} />
                  <span className="text-sm">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        />
      </div>
    </div>
  )
}
