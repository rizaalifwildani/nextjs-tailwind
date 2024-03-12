"use client"

import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline"
import flatpickr from "flatpickr"
import { useEffect } from "react"

type Props = {
  label?: string
  type?: "date" | "time"
  placeholder?: string
  className?: string
}

export default function CoreInputDateTime({
  type = "date",
  placeholder = type == "date" ? "mm/dd/yyyy" : "hh:mm",
  className = "",
  ...props
}: Props) {
  useEffect(() => {
    // Init flatpickr
    flatpickr(".form-datepicker", {
      mode: "single",
      static: true,
      noCalendar: type == "time",
      enableTime: type == "time",
      monthSelectorType: "static",
      dateFormat: type == "date" ? "M j, Y" : "H:i",
      time_24hr: true,
      prevArrow:
        // eslint-disable-next-line quotes
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        // eslint-disable-next-line quotes
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    })
  }, [type])

  return (
    <div className="core-input-date">
      {props.label && (
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {props.label}
        </label>
      )}
      <div className="relative">
        <input
          className={`
            form-datepicker 
          w-full
          rounded
          border-[1.5px] 
          border-stroke 
          bg-transparent 
          px-4 
            py-2 
            font-normal 
            outline-none 
            transition 
            focus:border-primary 
            active:border-primary 
            dark:border-form-strokedark 
            dark:bg-form-input 
            dark:focus:border-primary
            ${className}
          `}
          placeholder={placeholder}
          data-class="flatpickr-right"
        />

        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
          {type == "date" ? (
            <CalendarIcon className="h-5 w-5" />
          ) : (
            <ClockIcon className="h-5 w-5" />
          )}
        </div>
      </div>
    </div>
  )
}
