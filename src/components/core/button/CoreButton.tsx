import { Button } from "@nextui-org/react"
import { MouseEventHandler } from "react"

type Props = {
  label: string
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
  type?: "submit" | "reset" | "button"
  size?: "sm" | "md" | "lg" | undefined
  color?:
    | "primary"
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
  className?: string
  icon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function CoreButton({
  variant = "solid",
  type = "button",
  size = "md",
  color = "primary",
  loading = false,
  disabled = false,
  ...props
}: Props) {
  return (
    <div className="core-button">
      <Button
        variant={variant}
        type={type}
        color={color}
        size={size}
        className={`${color == "primary" ? "text-black" : ""} ${props.className}`}
        isLoading={loading}
        disabled={disabled}
        startContent={props.icon}
        onClick={props.onClick}
      >
        {props.label}
      </Button>
    </div>
  )
}
