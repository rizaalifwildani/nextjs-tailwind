import {
  PasswordVerificationRequest,
  PasswordVerificationSchema,
} from "@/models/request/passwordVerification.request"
import UserService from "@/services/user.service"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import CoreButton from "../button/CoreButton"
import CoreInputPassword from "../input/CoreInputPassword"

type Props = {
  title?: string
  callback?: (success: boolean) => void
  isOpen: boolean
  onOpenChange: () => void
}

export default function CoreModalPasswordVerification({ ...props }: Props) {
  const [loading, setLoading] = useState(false)

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordVerificationRequest>({
    resolver: yupResolver(PasswordVerificationSchema),
  })

  const handleConfirmation = async (data: PasswordVerificationRequest) => {
    setLoading(true)
    const res = await UserService.passwordVerification({
      password: data.password,
    })
    setLoading(false)

    if (props.callback) {
      props.callback(res)
    }

    if (!res) {
      setError("password", {
        message: "Password does not match",
      })
    }
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      placement="top-center"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(handleConfirmation)}>
            <ModalHeader className="flex flex-col gap-1">
              {props.title ?? "Konfirmasi"}
            </ModalHeader>
            <ModalBody>
              <CoreInputPassword
                register={register("password")}
                errorMessage={errors.password?.message}
              />
            </ModalBody>
            <ModalFooter>
              <CoreButton
                variant="flat"
                color="danger"
                label="Batal"
                onClick={() => {
                  setValue("password", "")
                  onClose()
                }}
              />
              <CoreButton
                loading={loading}
                type="submit"
                label="Konfirmasi"
                className="bg-blue-400 font-semibold text-white"
              />
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}
