import { MouseEventHandler } from "react"

type Props = {
  label: string
  type?: "submit" | "reset" | "button"
  className?: string
  icon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function CoreButton({
  type = "button",
  className = "",
  loading = false,
  disabled = false,
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
          ${loading || disabled ? "bg-stroke" : "bg-primary"}
          px-4
          py-1.5
          text-center
          text-sm
          font-normal
          ${loading || disabled ? "text-slate-400" : "text-white"}
          ${!loading && !disabled && "hover:bg-opacity-90"}
          ${className}
        `}
        onClick={props.onClick}
        disabled={loading || disabled}
      >
        {loading && (
          <>
            <svg
              className="h-5 w-5 animate-spin text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        )}
        {!loading && (
          <>
            {props.icon && <span>{props.icon}</span>}
            {props.label}
          </>
        )}
      </button>
    </div>
  )
}
