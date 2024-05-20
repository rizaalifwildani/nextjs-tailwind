import { Textarea } from "@nextui-org/react"

type Props = {
  label?: string
  placeholder?: string
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  disabled?: boolean
  errorMessage?: string
}

export default function CoreInputTextArea({
  placeholder = ". . .",
  disabled = false,
  ...props
}: Props) {
  return (
    <div className="core-input">
      <Textarea
        {...props.register}
        label={props.label}
        labelPlacement="outside"
        placeholder={placeholder}
        className={props.className}
        disabled={disabled}
        errorMessage={props.errorMessage}
        isInvalid={props.errorMessage && props.errorMessage.length > 0}
      />
    </div>
  )
}
