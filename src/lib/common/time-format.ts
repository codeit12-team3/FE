import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/ko'

dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.locale('ko')

/*
  초(seconds)를 입력받아 'mm:ss' 또는 'HH:mm:ss' 형식의 문자열로 반환
  0 이하일 경우 빈 문자열 반환
  @param seconds 초
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
export const formatDay = (
  date?: string | number | Date | null,
  format: string = 'YYYY.MM.DD',
): string => {
  if (!date) return ''

  const d = dayjs(date)
  if (!d.isValid()) return ''

  return d.format(format)
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

/**
 * xxxx-xx-xx 형식을 xx월 xx일 형식으로 변환
 * @param dateStr - '2024-05-20' 형태의 문자열
 * @returns '05월 20일' 또는 '5월 20일'
 */
export const formatDateToKorean = (dateStr: string | undefined | null) => {
  if (!dateStr) return '-'

  // 'M월 D일'은 5월 5일 (한자리 허용)
  // 'MM월 DD일'은 05월 05일 (두자리 고정)
  return dayjs(dateStr).format('M월 D일')
}
