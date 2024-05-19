import { Input } from "@nextui-org/react"
import { HTMLInputTypeAttribute } from "react"

type Props = {
  label?: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  className?: string
  appendIcon?: React.ReactNode
  appendIconOnClick?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  errorMessage?: string
}

export default function CoreInput({
  className = "",
  placeholder = ". . .",
  type = "text",
  ...props
}: Props) {
  return (
    <div className="core-input">
      <Input
        type={type}
        label={props.label}
        placeholder={placeholder}
        labelPlacement="outside"
        className={className}
        {...props.register}
        errorMessage={props.errorMessage}
        isInvalid={props.errorMessage && props.errorMessage.length > 0}
        endContent={
          <span
            className={props.appendIconOnClick ? "cursor-pointer" : ""}
            onClick={props.appendIconOnClick}
          >
            {props.appendIcon}
          </span>
        }
      />
    </div>
  )
}
