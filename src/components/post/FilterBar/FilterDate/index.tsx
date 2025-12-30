'use client'

import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'

import { IconArrowDown, IconArrowLeft, IconArrowRight } from '@/assets/svgr'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui'
import { cn } from '@/lib/common/cn'

dayjs.locale('ko')

export default function FilterDate({
  date,
  onApply,
  triggerClassName,
}: {
  date: string | undefined
  onApply: (date: string) => void
  triggerClassName?: string
}) {
  {
    const [isOpen, setIsOpen] = useState(false)
    const [tempSelected, setTempSelected] = useState<Dayjs | null>(null)
    const [currentMonth, setCurrentMonth] = useState(dayjs())
    const [viewMode, setViewMode] = useState<'date' | 'year'>('date')
    const [yearRangeStart, setYearRangeStart] = useState(
      Math.floor(dayjs().year() / 12) * 12,
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

    const handleYearSelect = (year: number) => {
      setCurrentMonth(currentMonth.year(year))
      setViewMode('date')
    }

    const years = Array.from({ length: 12 }, (_, i) => yearRangeStart + i)

    return (
      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          if (open) {
            setTempSelected(date ? dayjs(date) : null)
            if (date) {
              setCurrentMonth(dayjs(date))
            }
          }
        }}
      >
        <PopoverTrigger className={triggerClassName}>
          <div className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-3 font-medium rounded-xl h-10 text-sm text-gray-800">
            <span className="text-gray-800 text-xs sm:text-sm">
              {date ? `${dayjs(date).format('YYYY.MM.DD')}` : '날짜'}
            </span>
            <IconArrowDown />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {viewMode === 'year' ? (
            <div className="px-6 pt-5 pb-4">
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
                      className={cn(
                        'py-4 rounded-lg text-sm font-medium transition-colors',
                        {
                          'bg-blue-500 text-white': isCurrentYear,
                          'hover:bg-gray-100 text-gray-800': !isCurrentYear,
                        },
                      )}
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
                  onClick={() => setViewMode('date')}
                  className="flex-1"
                >
                  취소
                </Button>
              </div>
            </div>
          ) : (
            <div className="px-6 pt-5 pb-4">
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentMonth(currentMonth.subtract(1, 'month'))
                  }
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
                {['일', '월', '화', '수', '목', '금', '토'].map(
                  (day, index) => (
                    <div
                      key={day}
                      className={cn('text-center text-sm font-medium py-2', {
                        'text-red-500': index === 0,
                        'text-blue-500': index === 6,
                        'text-gray-800': index !== 0 && index !== 6,
                      })}
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                  const isCurrentMonth = day.month() === currentMonth.month()
                  const isSelected =
                    tempSelected && day.isSame(tempSelected, 'day')
                  const isSunday = day.day() === 0
                  const isSaturday = day.day() === 6
                  const disabled = !isCurrentMonth

                  return (
                    <button
                      key={day.format()}
                      type="button"
                      onClick={() => !disabled && setTempSelected(day)}
                      disabled={disabled}
                      className={cn(
                        'relative w-10 h-10 rounded-full flex flex-col items-center justify-center transition-colors',
                        {
                          'text-gray-500 cursor-not-allowed': disabled,
                          'hover:bg-gray-100': !disabled && !isSelected,
                          'bg-blue-500 text-white': isSelected,
                          'text-red-500':
                            !isSelected &&
                            isCurrentMonth &&
                            !disabled &&
                            isSunday,
                          'text-blue-500':
                            !isSelected &&
                            isCurrentMonth &&
                            !disabled &&
                            isSaturday,
                          'text-gray-800':
                            !isSelected &&
                            isCurrentMonth &&
                            !disabled &&
                            !isSunday &&
                            !isSaturday,
                        },
                      )}
                    >
                      <span className="text-sm">{day.date()}</span>
                    </button>
                  )
                })}
              </div>

              <div className="flex gap-3 pt-4 mt-1 border-t border-gray-300">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    onApply('')
                    setTempSelected(null)
                    setIsOpen(false)
                  }}
                  className="flex-1"
                >
                  초기화
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="md"
                  onClick={() => {
                    if (tempSelected) {
                      onApply(tempSelected.format('YYYY-MM-DD'))
                    }
                    setIsOpen(false)
                  }}
                  className="flex-1"
                >
                  확인
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    )
  }
}
