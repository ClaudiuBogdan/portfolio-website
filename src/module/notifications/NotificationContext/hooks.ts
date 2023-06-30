import { useEffect, useState } from "react"
import { NotificationData } from "./types"

export const useNotificationsLifecycle = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([])

  useEffect(() => {
    let nextNotificationCloseTime: number | null = null
    const updateNextCloseTime = (closeTime: number | null | undefined) => {
      if (closeTime === null || closeTime === undefined) {
        return
      }
      if (
        nextNotificationCloseTime === null ||
        closeTime < nextNotificationCloseTime
      ) {
        nextNotificationCloseTime = closeTime
      }
    }

    notifications.forEach((notification) => {
      updateNextCloseTime(notification.closeAt)
    })
    if (nextNotificationCloseTime === null) return

    const closeNotificationDelay = nextNotificationCloseTime - Date.now()

    if (closeNotificationDelay < 0) return

    const timeout = setTimeout(() => {
      setNotifications((notifications) =>
        notifications.map((notification) => ({
          ...notification,
          hide:
            typeof notification.closeAt === "number" &&
            notification.closeAt <= Date.now(),
        }))
      )
    }, closeNotificationDelay)
    return () => clearTimeout(timeout)
  }, [notifications])

  return [notifications, setNotifications] as const
}
