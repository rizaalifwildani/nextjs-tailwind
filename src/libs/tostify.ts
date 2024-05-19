import { Bounce, ToastOptions, toast } from "react-toastify"

interface ToastifyOptions extends ToastOptions {
  message: string
}

export default class Toastify {
  static show({
    position = "top-center",
    autoClose = 3000,
    type = "error",
    transition = Bounce,
    ...props
  }: ToastifyOptions) {
    toast(props.message, {
      position,
      autoClose,
      type,
      transition,
      ...props,
    })
  }
}
