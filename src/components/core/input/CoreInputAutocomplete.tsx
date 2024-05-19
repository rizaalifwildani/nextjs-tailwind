import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
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
  onClose?: () => void
}

export interface ICoreInputOptions {
  label: string
  value: string | number
}

export default function CoreInputAutocomplete({ ...props }: Props) {
  const [value, setValue] = useState(props.initialValue)

  return (
    <div className="core-input-autocomplete">
      <Autocomplete
        {...props.register}
        selectionMode="single"
        aria-label={props.label ?? "input-select"}
        labelPlacement="outside"
        label={props.label}
        placeholder={props.placeholder ?? "Select Item"}
        className={props.className}
        selectedKey={value}
        errorMessage={props.errorMessage}
        isInvalid={props.errorMessage && props.errorMessage.length > 0}
        onClose={props.onClose}
        onValueChange={(val) => {
          setValue(val)
        }}
      >
        {props.options.map((v) => (
          <AutocompleteItem key={v.value} value={v.value}>
            {v.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  )
}
