'use client'

import FormDatePicker from '@/components/form/FormDatePicker'
import { ProfileEditFormData } from '@/types/member/schema'

export default function BirthdaySelect() {
  return (
    <FormDatePicker<ProfileEditFormData>
      name="birth"
      label="생년월일"
      placeholder="생년월일을 선택해주세요"
      maxDate={new Date()}
    />
  )
}
