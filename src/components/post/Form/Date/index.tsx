'use client'

import { Calendar } from 'lucide-react'
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
    <div className="flex justify-between mb-2 gap-8">
      {/* 시작 날짜 */}
      <div className="flex flex-col relative">
        <Label className=" mb-2">
          여행 시작 일시 <span className="text-danger">*</span>
        </Label>

        <div className="relative">
          <DatePicker
            ref={startRef}
            selected={startDate}
            onChange={(d) => onChangeStartDate(d)}
            dateFormat="yyyy-MM-dd"
            className="px-4 py-2.5 rounded-lg text-sm bg-[#EDF4FB] outline-none w-[200px]"
            placeholderText="날짜 선택"
          />

          <Calendar
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-main size-5"
            onClick={() => startRef.current?.setOpen(true)}
          />
        </div>
      </div>

      {/* 종료 날짜 */}
      <div className="flex flex-col relative">
        <Label className=" mb-2">
          여행 종료 일시 <span className="text-danger">*</span>
        </Label>

        <div className="relative">
          <DatePicker
            ref={endRef}
            selected={endDate}
            onChange={(d) => onChangeEndDate(d)}
            dateFormat="yyyy-MM-dd"
            className="px-4 py-2.5 rounded-lg text-sm bg-[#EDF4FB] outline-none w-[200px]"
            placeholderText="날짜 선택"
          />

          <Calendar
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-main size-5"
            onClick={() => endRef.current?.setOpen(true)}
          />
        </div>
      </div>
    </div>
  )
}
