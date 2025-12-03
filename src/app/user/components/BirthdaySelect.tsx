'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

const years = Array.from({ length: 100 }, (_, i) => 2025 - i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)

export default function BirthdaySelect({
  onChange,
}: {
  onChange?: (date: { year: number; month: number; day: number }) => void
}) {
  const [year, setYear] = useState<number>(0)
  const [month, setMonth] = useState<number>(0)
  const [day, setDay] = useState<number>(0)

  const getDaysInMonth = (y: number, m: number) => {
    if (!y || !m) return 31
    return new Date(y, m, 0).getDate()
  }

  const days = Array.from(
    { length: getDaysInMonth(year, month) },
    (_, i) => i + 1,
  )

  useEffect(() => {
    if (year && month && day) {
      onChange?.({ year, month, day })
    }
  }, [year, month, day, onChange])

  return (
    <div className="flex gap-3 mt-3">
      <div className="relative">
        <select
          name="year"
          required
          value={year}
          onChange={(e) => {
            setYear(Number(e.target.value))
            setDay(0)
          }}
          className="rounded-xl px-3 py-2 min-w-[135px] h-12 bg-[#EDF4FB] appearance-none pr-10"
        >
          <option value={0}>년</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-input pointer-events-none" />
      </div>

      <div className="relative">
        <select
          name="month"
          required
          value={month}
          onChange={(e) => {
            setMonth(Number(e.target.value))
            setDay(0)
          }}
          className="rounded-xl px-3 py-2 min-w-25 h-12 bg-[#EDF4FB] appearance-none pr-10"
        >
          <option value={0}>월</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-input pointer-events-none" />
      </div>

      <div className="relative">
        <select
          name="day"
          required
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
          className="rounded-xl px-3 py-2 min-w-25 h-12 bg-[#EDF4FB] appearance-none pr-10"
          disabled={!year || !month}
        >
          <option value={0}>일</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-input pointer-events-none" />
      </div>
    </div>
  )
}
