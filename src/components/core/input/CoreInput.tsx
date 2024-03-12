import { HTMLInputTypeAttribute } from "react"
import CoreInputDateTime from "./CoreInputDateTime"

type Props = {
  label?: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  className?: string
  appendIcon?: React.ReactNode
}

export default function CoreInput({
  className = "",
  type = "text",
  ...props
}: Props) {
  const showLayout = () => {
    switch (type) {
      case "date":
        return <CoreInputDateTime type="date" />
      case "time":
        return <CoreInputDateTime type="time" />
      default:
        return (
          <div className="core-input">
            {props.label && (
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {props.label}
              </label>
            )}
            <div className="relative">
              <input
                type={type}
                placeholder={props.placeholder}
                className={`
                w-full 
                rounded
                border-[1.5px] 
                border-stroke 
                bg-transparent 
                px-4 
                py-2 
                  text-black 
                  outline-none
                  transition 
                  focus:border-primary 
                  active:border-primary 
                  disabled:cursor-default 
                disabled:bg-whiter 
                  dark:border-form-strokedark 
                  dark:bg-form-input 
                  dark:text-white 
                dark:focus:border-primary
                  ${className}
                `}
              />
              {props.appendIcon && (
                <span className="absolute right-4 top-2.5">
                  {props.appendIcon}
                </span>
              )}
            </div>
          </div>
        )
    }
  }

  return <div className="core-input">{showLayout()}</div>
}
