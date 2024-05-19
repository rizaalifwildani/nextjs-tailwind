"use client"

import { DatePicker } from "@nextui-org/react"

type Props = {
  label?: string
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  errorMessage?: string
}

export default function CoreInputDate({ ...props }: Props) {
  return (
    <div className="core-input-date">
      <DatePicker
        {...props.register}
        label={props.label}
        className={props.className}
        labelPlacement="outside"
        errorMessage={props.errorMessage}
        isInvalid={props.errorMessage && props.errorMessage.length > 0}
      />
    </div>
  )
}
