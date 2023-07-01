import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { FC } from "react"

export const NotificationIcon: FC<{ type: "success" | "error" }> = ({
  type,
}) => {
  if (type === "success") {
    return <CheckCircleIcon className="w-6 h-6 text-green-400" />
  }
  if (type === "error") return <XMarkIcon className="w-6 h-6 text-red-400" />

  return null
}
