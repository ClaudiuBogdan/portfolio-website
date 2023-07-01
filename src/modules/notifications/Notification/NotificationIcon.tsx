import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { FC } from "react"

export const NotificationIcon: FC<{ type: "success" | "error" }> = ({
  type,
}) => {
  if (type === "success") {
    return <CheckCircleIcon className="h-6 w-6 text-green-400" />
  }
  if (type === "error") return <XMarkIcon className="h-6 w-6 text-red-400" />

  return null
}
