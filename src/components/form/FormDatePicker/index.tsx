'use client'

import dayjs, { Dayjs } from 'dayjs'
import { Calendar as CalendarIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form'

import 'dayjs/locale/ko'

import { IconArrowLeft, IconArrowRight } from '@/assets/svgr'
import { Button } from '@/components/ui'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/common/cn'

dayjs.locale('ko')

interface CalendarPopupProps {
  currentMonth: Dayjs
  setCurrentMonth: (month: Dayjs) => void
  selectedDate: Date | null
  tempSelected: Dayjs | null
  setTempSelected: (date: Dayjs | null) => void
  onConfirm: () => void
  onCancel: () => void
  eventsOnDates: Date[]
  minDate?: Date
  maxDate?: Date
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({
  currentMonth,
  setCurrentMonth,
  selectedDate,
  tempSelected,
  setTempSelected,
  onConfirm,
  onCancel,
  eventsOnDates,
  minDate,
  maxDate,
}) => {
  const [viewMode, setViewMode] = useState<'date' | 'year'>('date')
  const [yearRangeStart, setYearRangeStart] = useState(
    Math.floor(currentMonth.year() / 12) * 12,
  )

  const startOfMonth = currentMonth.startOf('month')
  const endOfMonth = currentMonth.endOf('month')
  const startDate = startOfMonth.startOf('week')
  const endDate = endOfMonth.endOf('week')

  const days: Dayjs[] = []
  let day = startDate
  while (day.isBefore(endDate) || day.isSame(endDate, 'day')) {
    days.push(day)
    day = day.add(1, 'day')
  }

  const hasEvent = (date: Dayjs) => {
    return eventsOnDates.some((eventDate) =>
      dayjs(eventDate).isSame(date, 'day'),
    )
  }

  const isDateDisabled = (date: Dayjs) => {
    if (minDate && date.isBefore(dayjs(minDate), 'day')) return true
    if (maxDate && date.isAfter(dayjs(maxDate), 'day')) return true
    return false
  }

  const handleYearSelect = (year: number) => {
    setCurrentMonth(currentMonth.year(year))
    setViewMode('date')
  }

  const years = Array.from({ length: 12 }, (_, i) => yearRangeStart + i)

  if (viewMode === 'year') {
    return (
      <div className="absolute top-full left-0 w-82 max-w-md bg-white rounded-lg shadow-lg px-6 pt-5 pb-4 z-50 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => setYearRangeStart(yearRangeStart - 12)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="이전 12년"
          >
            <IconArrowLeft width={20} height={20} />
          </button>

          <h2 className="text-lg font-semibold text-gray-900">
            {yearRangeStart} - {yearRangeStart + 11}
          </h2>

          <button
            type="button"
            onClick={() => setYearRangeStart(yearRangeStart + 12)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="다음 12년"
          >
            <IconArrowRight width={20} height={20} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {years.map((year) => {
            const isCurrentYear = year === currentMonth.year()
            return (
              <button
                key={year}
                type="button"
                onClick={() => handleYearSelect(year)}
                className={`
                  py-4 rounded-lg text-sm font-medium transition-colors
                  ${isCurrentYear ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-800'}
                `}
              >
                {year}
              </button>
            )
          })}
        </div>

        <div className="flex gap-3 pt-4 mt-1 border-t border-gray-300">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onCancel}
            className="flex-1"
          >
            취소
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute top-full left-0 mt-2 w-82 px-6 pt-5 pb-4 max-w-md bg-white rounded-lg shadow-lg z-50 border border-gray-200 ">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="이전 달"
        >
          <IconArrowLeft width={20} height={20} />
        </button>

        <button
          type="button"
          onClick={() => setViewMode('year')}
          className="text-lg font-semibold text-gray-800 hover:bg-gray-100 px-3 py-1 rounded transition-colors cursor-pointer"
        >
          {currentMonth.format('YYYY년 M월')}
        </button>

        <button
          type="button"
          onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="다음 달"
        >
          <IconArrowRight width={20} height={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-medium py-2 ${
              index === 0
                ? 'text-red-500'
                : index === 6
                  ? 'text-blue-500'
                  : 'text-gray-800'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isCurrentMonth = day.month() === currentMonth.month()
          const isSelected = tempSelected && day.isSame(tempSelected, 'day')
          const isSunday = day.day() === 0
          const isSaturday = day.day() === 6
          const hasEventMarker = hasEvent(day)
          const disabled = !isCurrentMonth || isDateDisabled(day)

          return (
            <button
              key={index}
              type="button"
              onClick={() => !disabled && setTempSelected(day)}
              disabled={disabled}
              className={`
                relative w-10 h-10 rounded-full flex flex-col items-center justify-center
                transition-colors
                ${disabled ? 'text-gray-500 cursor-not-allowed' : ''}
                ${!disabled && !isSelected ? 'hover:bg-gray-100' : ''}
                ${isSelected ? 'bg-blue-500 text-white' : ''}
                ${!isSelected && isCurrentMonth && !disabled && isSunday ? 'text-red-500' : ''}
                ${!isSelected && isCurrentMonth && !disabled && isSaturday ? 'text-blue-500' : ''}
                ${!isSelected && isCurrentMonth && !disabled && !isSunday && !isSaturday ? 'text-gray-800' : ''}
              `}
            >
              <span className="text-sm">{day.date()}</span>
              {hasEventMarker && !isSelected && isCurrentMonth && (
                <div className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex gap-3 pt-4 mt-1 border-t border-gray-300">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onCancel}
          className="flex-1"
        >
          취소
        </Button>
        <Button
          type="button"
          variant="default"
          size="md"
          onClick={onConfirm}
          className="flex-1"
        >
          확인
        </Button>
      </div>
    </div>
  )
}

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  placeholder?: string
  maxDate?: Date
  minDate?: Date
  openToDate?: Date
  dateFormat?: string
  required?: boolean
  className?: string
  inputClassName?: string
  iconClassName?: string
  eventsOnDates?: Date[]
}

export default function FormDatePicker<T extends FieldValues>({
  name,
  label,
  placeholder = '날짜를 선택해주세요',
  maxDate,
  minDate,
  openToDate = new Date(),
  dateFormat = 'yyyy-MM-dd',
  required = false,
  className,
  inputClassName,
  iconClassName,
  eventsOnDates = [],
}: FormDatePickerProps<T>) {
  const { control } = useFormContext<T>()
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(dayjs(openToDate))
  const [tempSelected, setTempSelected] = useState<Dayjs | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const formatDate = (date: Date | null, format: string): string => {
    if (!date) return ''
    const d = dayjs(date)

    if (format === 'yyyy-MM-dd') {
      const year = d.year()
      const month = String(d.month() + 1).padStart(2, '0')
      const day = String(d.date()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    return d.format(format)
  }

  return (
    <div className={cn('space-y-2', className)} ref={containerRef}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedDate = field.value ? new Date(field.value) : null
          const displayValue = selectedDate
            ? formatDate(selectedDate, dateFormat)
            : ''

          const handleOpen = () => {
            if (!isOpen) {
              setIsOpen(true)
              setTempSelected(selectedDate ? dayjs(selectedDate) : null)
              if (selectedDate) {
                setCurrentMonth(dayjs(selectedDate))
              }
            } else {
              setIsOpen(false)
            }
          }

          const handleConfirm = () => {
            if (tempSelected) {
              const year = tempSelected.year()
              const month = String(tempSelected.month() + 1).padStart(2, '0')
              const day = String(tempSelected.date()).padStart(2, '0')
              field.onChange(`${year}-${month}-${day}`)
            } else {
              field.onChange('')
            }
            setIsOpen(false)
          }

          const handleCancel = () => {
            setIsOpen(false)
          }

          return (
            <div className="relative">
              <input
                type="text"
                value={displayValue}
                onClick={handleOpen}
                placeholder={placeholder}
                readOnly
                className={cn(
                  'w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none cursor-pointer',
                  inputClassName,
                )}
              />
              <CalendarIcon
                className={cn(
                  'absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none',
                  iconClassName,
                )}
              />
              {isOpen && (
                <CalendarPopup
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  selectedDate={selectedDate}
                  tempSelected={tempSelected}
                  setTempSelected={setTempSelected}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                  eventsOnDates={eventsOnDates}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              )}
            </div>
          )
        }}
      />
    </div>
  )
}
