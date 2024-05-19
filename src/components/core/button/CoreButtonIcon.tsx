import { Button } from "@nextui-org/react"
import { MouseEventHandler } from "react"

type Props = {
  className?: string
  icon: React.ReactNode
  color?:
    | "warning"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | undefined
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function CoreButtonIcon({
  disabled = false,
  color = "primary",
  ...props
}: Props) {
  return (
    <div className="core-button-icon">
      <Button
        isIconOnly
        className={props.className}
        disabled={disabled}
        color={color}
        variant="faded"
        onClick={props.onClick}
      >
        {props.icon}
      </Button>
    </div>
  )
}
