export interface Notification {
  notificationId: string
  postId: string
  type: NotificationType
  sender: {
    id: string
    nickname: string
    image: string
  }
  timestamp: string
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
