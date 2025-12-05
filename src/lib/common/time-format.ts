import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

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
