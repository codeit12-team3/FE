'use client'

import { CircleAlert } from 'lucide-react'
import { ComponentProps, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { AnimateFieldset, UnitSelect } from '@/components/auth/form'
import { Label } from '@/components/ui'
import { SignupFormValues } from '@/types/auth'

type Props = ComponentProps<typeof AnimateFieldset>

export default function BirthFieldset(props: Props) {
  const {
    formState: { errors },
  } = useFormContext<SignupFormValues>()

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 101 }, (_, i) => String(currentYear - i))
  }, [])
  const monthOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => String(i + 1))
  }, [])
  const dayOptions = useMemo(() => {
    return Array.from({ length: 31 }, (_, i) => String(i + 1))
  }, [])

  const hasError = !!errors.year || !!errors.month || !!errors.day
  const errorMessage =
    errors.year?.message || errors.month?.message || errors.day?.message

  return (
    <AnimateFieldset {...props}>
      <legend className="sr-only">생년월일 선택</legend>
      <div className="space-y-2 w-full">
        <Label htmlFor={'year'}>생년월일</Label>
        <div className="space-y-1 w-full">
          <div className="flex items-center gap-3 space-y-1 w-full">
            {/* 년 */}
            <UnitSelect
              name="year"
              options={yearOptions}
              placeholder="년"
              className="flex-2"
              suffix="년"
            />

            {/* 월 */}
            <UnitSelect
              name="month"
              options={monthOptions}
              placeholder="월"
              className="flex-1"
              suffix="월"
            />

            {/* 일 */}
            <UnitSelect
              name="day"
              options={dayOptions}
              placeholder="일"
              className="flex-1"
              suffix="일"
            />
          </div>
          <p className="h-6 flex text-xs text-danger items-center gap-1 px-4">
            {hasError && <CircleAlert className="size-4" />}
            {errorMessage}
          </p>
        </div>
      </div>
    </AnimateFieldset>
  )
}
