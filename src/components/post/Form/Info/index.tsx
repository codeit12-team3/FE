import { Controller, useFormContext } from 'react-hook-form'

import FormInput from '@/components/form/FormInput'
import FormSelect from '@/components/form/FormSelect'
import { Label, RadioGroup, RadioGroupItem } from '@/components/ui'
import { AGE_OPTIONS, GENDER_OPTIONS, REGION_OPTIONS } from '@/constants/posts'
import { PostFormValues } from '@/types/posts/schema'

export default function Info() {
  const { control } = useFormContext<PostFormValues>()
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <Label htmlFor="nation" className="mb-3">
            국가 <span className="text-destructive">*</span>
          </Label>
          <FormSelect
            name="nation"
            options={REGION_OPTIONS}
            placeholder="국가를 선택해주세요"
          />
        </div>

        <div>
          <Label htmlFor="nation" className="mb-3">
            도시 <span className="text-destructive">*</span>
          </Label>
          <FormSelect
            name="region"
            options={REGION_OPTIONS}
            placeholder="도시를 선택해주세요"
          />
        </div>
        <div></div>
      </div>

      <div className="flex justify-between">
        <FormInput
          label="모집 정원"
          type="number"
          name="member"
          placeholder="인원을 입력해주세요"
          className="w-1/2"
          required
        />
        <div>
          <Label htmlFor="nation" className="mb-3">
            성별 <span className="text-destructive">*</span>
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
                  <Label key={opt.value} className="flex items-center gap-2">
                    <RadioGroupItem value={opt.value} />
                    <span className="text-sm">{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            )}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="nation" className="mb-3">
          나이<span className="text-destructive">*</span>
        </Label>
        <Controller
          name="ageType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value ?? ''}
              onValueChange={field.onChange}
              className="flex gap-3 items-center"
            >
              {AGE_OPTIONS.map((opt) => (
                <Label key={opt.value} className="flex items-center gap-2">
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
