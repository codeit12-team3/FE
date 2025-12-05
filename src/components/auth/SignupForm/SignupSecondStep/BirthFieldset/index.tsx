'use client'

import { CircleAlert } from 'lucide-react'
import { useController, useFormContext } from 'react-hook-form'

import AnimateFieldset from '@/components/auth/AnimateFieldset'
import { Label, Select } from '@/components/common'
import { SignupFormValues } from '@/types/auth'

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 101 }, (_, i) => String(currentYear - i))
}

const generateMonthOptions = () => {
  return Array.from({ length: 12 }, (_, i) => String(i + 1))
}

const generateDayOptions = () => {
  return Array.from({ length: 31 }, (_, i) => String(i + 1))
}

export default function BirthFieldset() {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignupFormValues>()

  const {
    field: { ref: yearRef, ...yearField },
    fieldState: { error: yearError },
  } = useController({ name: 'year', control })
  const {
    field: { ref: monthRef, ...monthField },
    fieldState: { error: monthError },
  } = useController({ name: 'month', control })
  const {
    field: { ref: dayRef, ...dayField },
    fieldState: { error: dayError },
  } = useController({ name: 'day', control })

  const yearOptions = generateYearOptions()
  const monthOptions = generateMonthOptions()
  const dayOptions = generateDayOptions()

  const hasError = !!yearError || !!monthError || !!dayError
  const errorMessage =
    yearError?.message || monthError?.message || dayError?.message

  return (
    <AnimateFieldset>
      <legend className="sr-only">생년월일 선택</legend>
      <div className="space-y-2 w-full">
        <Label htmlFor={'year'}>생년월일</Label>
        <div className="flex items-center gap-3 space-y-1 w-full">
          {/* 년 Select */}
          <Select
            className="flex-2"
            ref={yearRef}
            value={yearField.value}
            onValueChange={yearField.onChange}
            selectProps={{
              id: 'year',
              name: yearField.name,
              onBlur: yearField.onBlur,
              onChange: (e) => yearField.onChange(e.target.value),
            }}
          >
            <Select.Trigger aria-invalid={!!errors.year}>
              <Select.Value suffix="년" placeholder="년" />
            </Select.Trigger>
            <Select.Content>
              {yearOptions.map((year) => (
                <Select.Item key={year} value={year}>
                  {year}년
                </Select.Item>
              ))}
            </Select.Content>
          </Select>

          {/* 월 Select */}
          <Select
            className="flex-1"
            ref={monthRef}
            value={monthField.value}
            onValueChange={monthField.onChange}
            selectProps={{
              id: 'month',
              name: monthField.name,
              onBlur: monthField.onBlur,
              onChange: (e) => monthField.onChange(e.target.value),
            }}
          >
            <Select.Trigger aria-invalid={!!errors.month}>
              <Select.Value suffix="월" placeholder="월" />
            </Select.Trigger>
            <Select.Content>
              {monthOptions.map((month) => (
                <Select.Item key={month} value={month}>
                  {month}월
                </Select.Item>
              ))}
            </Select.Content>
          </Select>

          {/* 일 Select */}
          <Select
            className="flex-1"
            ref={dayRef}
            value={dayField.value}
            onValueChange={dayField.onChange}
            selectProps={{
              id: 'day',
              name: dayField.name,
              onBlur: dayField.onBlur,
              onChange: (e) => dayField.onChange(e.target.value),
            }}
          >
            <Select.Trigger aria-invalid={!!errors.day}>
              <Select.Value suffix="일" placeholder="일" />
            </Select.Trigger>
            <Select.Content>
              {dayOptions.map((day) => (
                <Select.Item key={day} value={day}>
                  {day}일
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>
        <p className="h-6 flex text-xs text-danger items-center gap-1 px-4">
          {hasError && <CircleAlert className="size-4" />}
          {errorMessage}
        </p>
      </div>
    </AnimateFieldset>
  )
}
