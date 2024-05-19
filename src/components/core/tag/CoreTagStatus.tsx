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
    case "open":
      color = "default"
      break
    case "reopen":
      color = "default"
      break
    case "inprocess":
      color = "warning"
      break
    case "approved":
      color = "success"
      break
    case "disburse":
      color = "success"
      break
    case "rejected":
      color = "danger"
      break
    default:
      color = "danger"
      break
  }

  return <CoreTag text={props.status} color={color} />
}
