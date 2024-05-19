import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import CoreInput from "./CoreInput"

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  errorMessage?: string
}

export default function CoreInputPassword({ ...props }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <CoreInput
      register={props.register}
      type={showPassword ? "text" : "password"}
      label="Password"
      placeholder="Input your password"
      appendIcon={
        showPassword ? (
          <EyeSlashIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )
      }
      appendIconOnClick={() => setShowPassword(!showPassword)}
      errorMessage={props.errorMessage}
    />
  )
}
