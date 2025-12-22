import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/ko'

dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.locale('ko')

/**
 * 초(seconds)를 입력받아 'mm:ss' 또는 'HH:mm:ss' 형식의 문자열로 반환
 * 0 이하일 경우 빈 문자열 반환
 * @param seconds 초
 */
export const formatTimer = (seconds: number) => {
  if (!seconds || seconds <= 0) return ''

  const durationObj = dayjs.duration(seconds, 'seconds')

  const hours = durationObj.hours()
  const minutes = durationObj.minutes()
  const secs = durationObj.seconds()

  const pad = (n: number) => n.toString().padStart(2, '0')

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
  }

  return `${pad(minutes)}:${pad(secs)}`
}
/**
 * 날짜를 yyyy.mm.dd 형태로 변환
 **/
export const formatDay = (date?: string | number | Date | null): string => {
  if (!date) return ''

  const d = dayjs(date)

  if (!d.isValid()) return ''

  return d.format('YYYY.MM.DD')
}
/**
 * 날짜 → 상대시간 반환
 * 예: 방금 전, 3분 전, 1시간 전, 2일 전
 */
export const formatRelativeTime = (
  date?: string | number | Date | null,
): string => {
  if (!date) return ''

  const d = dayjs(date)
  if (!d.isValid()) return ''

  const now = dayjs()

  if (d.isAfter(now)) {
    return '방금 전'
  }

  return d.fromNow()
}
