export interface Notification {
  notificationId: string
  postId: string
  type: NotificationType
  applyMessage: string
  sender: {
    id: string
    nickname: string
    image: string
  }
  timestamp: number
}

export interface NotificationReq {
  lastNotificationId: string
  size: number
}

export interface NotificationRes {
  content: Notification[]
  isLast: boolean
}

type NotificationType = 'COMPANION_REQUEST'
