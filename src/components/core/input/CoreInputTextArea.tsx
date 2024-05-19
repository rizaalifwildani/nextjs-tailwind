import { Textarea } from "@nextui-org/react"

type Props = {
  label?: string
  placeholder?: string
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  errorMessage?: string
}

export default function CoreInputTextArea({
  placeholder = ". . .",
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
        errorMessage={props.errorMessage}
        isInvalid={props.errorMessage && props.errorMessage.length > 0}
      />
    </div>
  )
}
