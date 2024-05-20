import StatusUtil from "@/utils/status.util"
import CoreTag from "./CoreTag"

type Props = {
  status: string
}

export default function CoreTagStatus({ ...props }: Props) {
  let color:
    | "success"
    | "warning"
    | "danger"
    | "primary"
    | "default"
    | "secondary"
    | undefined
  switch (props.status) {
    case StatusUtil.OPEN:
      color = "default"
      break
    case StatusUtil.REOPEN:
      color = "default"
      break
    case StatusUtil.INPROCESS:
      color = "warning"
      break
    case StatusUtil.APPROVED:
      color = "success"
      break
    case StatusUtil.DISBURSE:
      color = "success"
      break
    case StatusUtil.REJECTED:
      color = "danger"
      break
    default:
      color = "danger"
      break
  }

  return <CoreTag text={props.status} color={color} />
}
