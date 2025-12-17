'use client'

import { ko } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import DatePicker from 'react-datepicker'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { ProfileEditFormData } from '@/types/member/schema'

import 'react-datepicker/dist/react-datepicker.css'

export default function BirthdaySelect() {
  const { control } = useFormContext<ProfileEditFormData>()

  return (
    <div className="space-y-2">
      <Label>생년월일</Label>
      <Controller
        name="birth"
        control={control}
        render={({ field }) => (
          <div className="relative">
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) => {
                if (date) {
                  const year = date.getFullYear()
                  const month = String(date.getMonth() + 1).padStart(2, '0')
                  const day = String(date.getDate()).padStart(2, '0')
                  field.onChange(`${year}-${month}-${day}`)
                } else {
                  field.onChange('')
                }
              }}
              locale={ko}
              dateFormat="yyyy-MM-dd"
              placeholderText="생년월일을 선택해주세요"
              maxDate={new Date()}
              minDate={new Date('1900-01-01')}
              openToDate={new Date('2000-01-01')}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              yearDropdownItemNumber={100}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none"
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          </div>
        )}
      />
    </div>
  )
}
