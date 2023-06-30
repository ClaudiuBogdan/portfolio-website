import { useEffect, useState } from "react"

export const useNotificationLifecycle = (
  notificationId: string,
  onClose: (notificationId: string) => void,
  mounted: boolean,
  hide?: boolean
) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (mounted) {
      setShow(true)
    }
  }, [mounted])

  useEffect(() => {
    const animationDuration = 300
    if (hide) {
      setShow(false)
      const timeout = setTimeout(() => {
        onClose(notificationId)
      }, animationDuration)
      return () => clearTimeout(timeout)
    }
  }, [notificationId, hide, onClose])

  return show
}
