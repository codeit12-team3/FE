'use client'

import dayjs, { Dayjs } from 'dayjs'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { CalendarPopup } from '@/components/form/FormDatePicker'
import { cn } from '@/lib/common'

import { useMultiTabs } from '../../MultiTab'

import 'dayjs/locale/ko'

dayjs.locale('ko')

interface FilterDatePickerProps {
  paramName: string
  placeholder?: string
  dateFormat?: string
  className?: string
  minDate?: Date
  maxDate?: Date
}

export function FilterDatePicker({
  paramName,
  placeholder = '날짜를 선택해주세요',
  dateFormat = 'YYYY-MM-DD',
  className,
  minDate,
  maxDate,
}: FilterDatePickerProps) {
  const { getActiveTab, setTab } = useMultiTabs()
  const selectedValue = getActiveTab(paramName)

  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(dayjs())
  const [tempSelected, setTempSelected] = useState<Dayjs | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        inputRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // 표시할 값
  const displayValue = selectedValue
    ? dayjs(selectedValue).format(dateFormat)
    : ''

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true)
      setTempSelected(selectedValue ? dayjs(selectedValue) : null)
      if (selectedValue) {
        setCurrentMonth(dayjs(selectedValue))
      }
    } else {
      setIsOpen(false)
    }
  }

  const handleConfirm = () => {
    if (tempSelected) {
      setTab(paramName, tempSelected.format('YYYY-MM-DD'))
    } else {
      setTab(paramName, undefined)
    }
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <div className={cn('relative', className)} ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        onClick={handleOpen}
        placeholder={placeholder}
        readOnly
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none cursor-pointer"
      />
      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />

      {isOpen && (
        <CalendarPopup
          ref={popupRef}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          tempSelected={tempSelected}
          setTempSelected={setTempSelected}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          eventsOnDates={[]}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </div>
  )
}
