import { MouseEventHandler } from "react"

type Props = {
  label?: string
  className?: string
  icon?: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function CoreButton({ className = "", ...props }: Props) {
  return (
    <div className="core-button">
      <button
        className={`
          bg-primary
          inline-flex
          items-center
          justify-center
          gap-2.5
          rounded
          px-5
          py-2
          text-center
          font-medium
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
