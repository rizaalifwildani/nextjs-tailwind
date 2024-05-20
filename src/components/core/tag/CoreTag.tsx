import { Chip } from "@nextui-org/react"

type Props = {
  text: string
  color?:
    | "success"
    | "warning"
    | "danger"
    | "primary"
    | "default"
    | "secondary"
    | undefined
  className?: string
}

export default function CoreTag({ color = "success", ...props }: Props) {
  return (
    <Chip
      className={`
        capitalize
        ${props.className ?? ""}
        ${color == "secondary" ? "bg-blue-400 font-semibold text-white" : ""}
      `}
      color={color}
      size="sm"
      variant="flat"
    >
      {props.text}
    </Chip>
  )
}
