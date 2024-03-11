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
          <>
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
                border-stroke 
                focus:border-primary
                active:border-primary 
                disabled:bg-whiter 
                dark:border-form-strokedark 
                dark:bg-form-input 
                dark:focus:border-primary 
                  w-full 
                  rounded
                  border-[1.5px] 
                  bg-transparent 
                  px-4 
                  py-2 
                text-black 
                  outline-none 
                  transition 
                  disabled:cursor-default 
                dark:text-white
                  ${className}
                `}
              />
              {props.appendIcon && (
                <span className="absolute right-4 top-2.5">
                  {props.appendIcon}
                </span>
              )}
            </div>
          </>
        )
    }
  }

  return <div className="core-input">{showLayout()}</div>
}
