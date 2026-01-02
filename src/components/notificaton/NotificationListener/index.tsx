'use client'

import { useNotificationSSE } from '@/hooks/notification'

export default function NotificationListener() {
  useNotificationSSE()

  return null
}
