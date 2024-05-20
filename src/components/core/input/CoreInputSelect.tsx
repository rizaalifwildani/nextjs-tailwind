import { Select, SelectItem } from "@nextui-org/react"
import { useState } from "react"

type Props = {
  label?: string
  initialValue?: string | number
  placeholder?: string
  className?: string
  options: ICoreInputOptions[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  errorMessage?: string
  disabled?: boolean
  onChange?: (e: string) => void
}

export interface ICoreInputOptions {
  label: string
  value: string | number
}

export default function CoreInputSelect({ disabled = false, ...props }: Props) {
  const [value, setValue] = useState(props.initialValue)

  return (
    <div className="core-input-select">
      <Select
        {...props.register}
        selectionMode="single"
        aria-label={props.label ?? "input-select"}
        labelPlacement="outside"
        label={props.label}
        placeholder={props.placeholder ?? "Select Item"}
        className={props.className}
        selectedKeys={props.initialValue ? [`${value}`] : undefined}
        errorMessage={props.errorMessage}
        isInvalid={props.errorMessage && props.errorMessage.length > 0}
        isDisabled={disabled}
        onChange={(e) => {
          setValue(e.target.value)
          if (props.onChange) {
            props.onChange(e.target.value)
          }
        }}
      >
        {props.options.map((v) => (
          <SelectItem key={v.value} value={v.value}>
            {v.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
