"use client"

import CoreLogo from "@/components/core/CoreLogo"
import CoreButton from "@/components/core/button/CoreButton"
import CoreInput from "@/components/core/input/CoreInput"
import CoreInputPassword from "@/components/core/input/CoreInputPassword"
import { RouterConfig } from "@/configs/router.config"
import { LoginRequest, LoginSchema } from "@/models/request/login.request"
import AuthService from "@/services/auth.service"
import { yupResolver } from "@hookform/resolvers/yup"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function LoginPage() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(LoginSchema),
  })

  const handleLogin = async (data: LoginRequest) => {
    setLoadingSubmit(true)
    const res = await AuthService.login(data)
    if (res) {
      router.push(RouterConfig.SUBMISSION)
    } else {
      setError("password", {
        message: "*No.HP atau Password tidak cocok",
      })
    }
    setLoadingSubmit(false)
  }

  return (
    <section className="login-page">
      <div className="flex h-screen items-center justify-center">
        <div className="w-90 md:w-2/3 lg:w-1/4 xl:w-1/4">
          <Card className="p-5">
            <CardHeader className="flex flex-row items-center justify-center gap-2 text-title-md font-bold">
              <CoreLogo width={35} />
              Sign In to {appName}
            </CardHeader>
            <CardBody>
              <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col gap-4"
              >
                <CoreInput
                  label="No.HP"
                  type="tel"
                  placeholder="08xxxxxxxx"
                  register={register("phoneNumber")}
                  errorMessage={errors.phoneNumber?.message}
                />

                <CoreInputPassword
                  register={register("password")}
                  errorMessage={errors.password?.message}
                />

                <div>
                  <CoreButton
                    type="submit"
                    label="Sign In"
                    className="h-10 w-full text-lg"
                    loading={loadingSubmit}
                  />
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}
