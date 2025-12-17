'use client'

import { ko } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import DatePicker from 'react-datepicker'
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/common/cn'

import 'react-datepicker/dist/react-datepicker.css'

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  placeholder?: string
  maxDate?: Date
  minDate?: Date
  openToDate?: Date
  dateFormat?: string
  required?: boolean
  showMonthDropdown?: boolean
  showYearDropdown?: boolean
  dropdownMode?: 'select' | 'scroll'
  yearDropdownItemNumber?: number
  className?: string
  inputClassName?: string
  iconClassName?: string
}

export default function FormDatePicker<T extends FieldValues>({
  name,
  label,
  placeholder = '날짜를 선택해주세요',
  maxDate = new Date(),
  minDate = new Date('1900-01-01'),
  openToDate = new Date('2000-01-01'),
  dateFormat = 'yyyy-MM-dd',
  required = false,
  showMonthDropdown = true,
  showYearDropdown = true,
  dropdownMode = 'select',
  yearDropdownItemNumber = 100,
  className,
  inputClassName,
  iconClassName,
}: FormDatePickerProps<T>) {
  const { control } = useFormContext<T>()

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Controller
        name={name}
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
              dateFormat={dateFormat}
              placeholderText={placeholder}
              maxDate={maxDate}
              minDate={minDate}
              openToDate={openToDate}
              showMonthDropdown={showMonthDropdown}
              showYearDropdown={showYearDropdown}
              dropdownMode={dropdownMode}
              yearDropdownItemNumber={yearDropdownItemNumber}
              className={cn(
                'w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none',
                inputClassName,
              )}
            />
            <CalendarIcon
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none',
                iconClassName,
              )}
            />
          </div>
        )}
      />
    </div>
  )
}
