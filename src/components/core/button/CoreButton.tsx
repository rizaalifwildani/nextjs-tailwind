import { MouseEventHandler } from "react"

type Props = {
  label: string
  type?: "submit" | "reset" | "button"
  className?: string
  icon?: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function CoreButton({
  type = "button",
  className = "",
  ...props
}: Props) {
  return (
    <div className="core-button">
      <button
        type={type}
        className={`
          inline-flex
          items-center
          justify-center
          gap-2.5
          rounded
          bg-primary
          px-4
          py-1.5
          text-center
          text-sm
          font-normal
          text-white
          hover:bg-opacity-90
          ${className}
        `}
        onClick={props.onClick}
      >
        {props.icon && <span>{props.icon}</span>}
        {props.label}
      </button>
    </div>
  )
}
