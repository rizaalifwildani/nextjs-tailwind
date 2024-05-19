"use client"

import { ClockIcon } from "@heroicons/react/24/outline"
import { TimeInput } from "@nextui-org/react"

type Props = {
  label?: string
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  errorMessage?: string
}

export default function CoreInputTime({ ...props }: Props) {
  return (
    <div className="core-input-time">
      <TimeInput
        {...props.register}
        label={props.label}
        labelPlacement="outside"
        errorMessage={props.errorMessage}
        isInvalid={props.errorMessage && props.errorMessage.length > 0}
        endContent={<ClockIcon className="h-5 w-5" />}
      />
    </div>
  )
}
