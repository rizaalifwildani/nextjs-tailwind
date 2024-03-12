import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

type Props = {
  id?: string
  label?: string
  initialValue?: string | number
  placeholder?: string
  className?: string
  prependIcon?: React.ReactNode
  options: ICoreInputOptions[]
  onChange?: (e: string) => void
}

export interface ICoreInputOptions {
  label: string
  value: string | number
}

export default function CoreInputSelect({
  initialValue = "",
  className = "",
  ...props
}: Props) {
  const [selectedOption, setSelectedOption] = useState<string | number>(
    initialValue,
  )
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false)

  const changeTextColor = () => {
    setIsOptionSelected(true)
  }

  return (
    <div className="core-input-select">
      {props.label && (
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {props.label}
        </label>
      )}
      <div className="relative">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value)
            changeTextColor()
            if (props.onChange) {
              props.onChange(e.target.value)
            }
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 pl-4 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? "text-black dark:text-white" : ""
          } ${className}`}
        >
          {props.placeholder && (
            <option value="" disabled className="text-body dark:text-bodydark">
              {props.placeholder}
            </option>
          )}
          {props.options.map((v) => (
            <option
              key={`select-option-${v.label}`}
              value={v.value}
              className="text-body dark:text-bodydark"
            >
              {v.label}
            </option>
          ))}
        </select>

        <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
          <ChevronDownIcon className="h-5 w-5 text-black dark:text-white" />
        </span>
      </div>
    </div>
  )
}
