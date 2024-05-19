import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"

type Props = {
  message: string
  type?: "success" | "warning" | "info" | "error"
}

export default function CoreAlert({ type = "info", ...props }: Props) {
  let backgroundColor = "bg-blue-100"
  let borderColor = "border-blue-400"
  let textColor = "text-blue-400"
  const iconSize = "h-5 w-5"
  let icon = <InformationCircleIcon className={iconSize} />

  switch (type) {
    case "success":
      backgroundColor = "bg-green-100"
      borderColor = "border-green-400"
      textColor = "text-green-400"
      icon = <CheckCircleIcon className={iconSize} />
      break
    case "warning":
      backgroundColor = "bg-orange-100"
      borderColor = "border-orange-400"
      textColor = "text-orange-400"
      icon = <ExclamationCircleIcon className={iconSize} />
      break
    case "error":
      backgroundColor = "bg-red-100"
      borderColor = "border-red-400"
      textColor = "text-red-400"
      icon = <ExclamationTriangleIcon className={iconSize} />
      break
    default:
      backgroundColor = "bg-blue-100"
      borderColor = "border-blue-400"
      textColor = "text-blue-400"
      icon = <InformationCircleIcon className={iconSize} />
      break
  }

  return (
    <div
      className={`rounded-xl border p-4 text-sm ${borderColor} ${backgroundColor} ${textColor} flex flex-row items-start gap-2`}
      role="alert"
    >
      {icon}
      <span className="text-md">{props.message}</span>
    </div>
  )
}
