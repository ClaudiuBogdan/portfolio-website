export type NotificationPayload = {
  title: string
  message: string
  type: "success" | "error"
  autoClose?: boolean
  duration?: number
}

export type NotificationData = NotificationPayload & {
  id: string
  hide?: boolean
  closeAt?: number | null
}
