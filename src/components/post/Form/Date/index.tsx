'use client'

import { CalendarDays } from 'lucide-react'
import { useRef } from 'react'
import DatePicker from 'react-datepicker'

import { Label } from '@/components/ui'

interface DateProps {
  startDate: Date | null
  endDate: Date | null
  onChangeStartDate: (v: Date | null) => void
  onChangeEndDate: (v: Date | null) => void
}

export default function Date({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}: DateProps) {
  const startRef = useRef<DatePicker | null>(null)
  const endRef = useRef<DatePicker | null>(null)

  return (
    <div className="flex gap-8">
      <div className="flex flex-col relative">
        <Label className=" mb-3">
          여행 시작 일시 <span className="text-danger">*</span>
        </Label>

        <div className="relative flex items-center gap-2 px-4 py-2.5 w-full bg-sub rounded-lg text-sm  cursor-pointer">
          <DatePicker
            ref={startRef}
            selected={startDate}
            onChange={(d) => onChangeStartDate(d)}
            dateFormat="yyyy-MM-dd"
            className="text-muted-foreground font-medium text-base bg-sub"
            placeholderText="시작 날짜 선택"
          />

          <CalendarDays
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-main size-5"
            onClick={() => startRef.current?.setOpen(true)}
          />
        </div>
      </div>

      <div className="flex flex-col relative">
        <Label className=" mb-3">
          여행 종료 일시 <span className="text-danger">*</span>
        </Label>

        <div className="relative flex items-center gap-2 px-4 py-2.5 w-full bg-sub rounded-lg text-sm  cursor-pointer">
          <DatePicker
            ref={endRef}
            selected={endDate}
            onChange={(d) => onChangeEndDate(d)}
            dateFormat="yyyy-MM-dd"
            className="text-muted-foreground font-medium text-base bg-sub"
            placeholderText="종료 날짜 선택"
          />

          <CalendarDays
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-main size-5"
            onClick={() => endRef.current?.setOpen(true)}
          />
        </div>
      </div>
    </div>
  )
}
