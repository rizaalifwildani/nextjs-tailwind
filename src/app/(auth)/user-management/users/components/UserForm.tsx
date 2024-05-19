"use client"

import dataCompany from "@/assets/data/companies.json"
import dataRole from "@/assets/data/roles.json"
import dataUser from "@/assets/data/users.json"
import CoreAlert from "@/components/core/CoreAlert"
import CoreButton from "@/components/core/button/CoreButton"
import CoreInput from "@/components/core/input/CoreInput"
import { ICoreInputOptions } from "@/components/core/input/CoreInputAutocomplete"
import CoreInputPassword from "@/components/core/input/CoreInputPassword"
import CoreInputSelect from "@/components/core/input/CoreInputSelect"
import CoreInputTextArea from "@/components/core/input/CoreInputTextArea"
import CoreModalPasswordVerification from "@/components/core/modal/CoreModalPasswordVerification"
import { RouterConfig } from "@/configs/router.config"
import { UserRequest, UserSchema } from "@/models/request/user.request"
import { LENDER, RoleResponse } from "@/models/response/role.response"
import { UserResponse } from "@/models/response/user.response"
import { yupResolver } from "@hookform/resolvers/yup"
import { Spinner, useDisclosure } from "@nextui-org/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export default function UserForm() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const router = useRouter()
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const query = useSearchParams()

  const [loadingData, setLoadingData] = useState(true)
  const [data, setData] = useState<UserResponse | undefined>()
  const [editMode, setEditMode] = useState(false)

  const [roles, setRoles] = useState<RoleResponse[]>([])
  const [roleOptions, setRoleOptions] = useState<ICoreInputOptions[]>([])
  const [showLenderForm, setShowLenderForm] = useState(false)

  const [companies, setCompanies] = useState<ICoreInputOptions[]>([])

  useEffect(() => {
    const fetchRole = () => {
      const masterListRole: ICoreInputOptions[] = []
      dataRole.forEach((v) => {
        masterListRole.push({
          label: v.displayName,
          value: v.id,
        })
      })
      setRoles(dataRole)
      setRoleOptions(masterListRole)
    }
    fetchRole()
  }, [])

  useEffect(() => {
    const fetchCompany = () => {
      const masterListCompany: ICoreInputOptions[] = []
      dataCompany.forEach((v) => {
        masterListCompany.push({
          label: v.name,
          value: v.id,
        })
      })
      setCompanies(masterListCompany)
    }
    fetchCompany()
  }, [])

  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRequest>({
    resolver: yupResolver(UserSchema),
  })

  useEffect(() => {
    const fetchData = () => {
      setLoadingData(true)
      setEditMode(false)
      setShowLenderForm(false)
      const id = query.get("q")
      if (id) {
        setEditMode(true)
        const find = dataUser.find((v) => v.id == id)
        if (find) {
          setData(find)
          if (find.company) {
            setShowLenderForm(true)
          }
        }
      }
      setLoadingData(false)
    }
    fetchData()
  }, [query])

  const handleRole = (val: string) => {
    setShowLenderForm(false)
    const findRole = roles.find((v) => v.id == val)
    if (findRole && findRole.name == LENDER) {
      setShowLenderForm(true)
    }
  }

  const doSubmit = async () => {
    setLoadingSubmit(true)
    onClose()
    setTimeout(() => {
      setLoadingSubmit(false)
      withReactContent(Swal)
        .fire({
          title: "Data berhasil di simpan",
          icon: "success",
          confirmButtonText: "Mengerti",
        })
        .finally(() => {
          router.push(RouterConfig.USER)
        })
    }, 2000)
  }

  return (
    <>
      {loadingData && (
        <div className="flex flex-col gap-3 text-center">
          <Spinner />
          <span>Sedang mengunduh data . . .</span>
        </div>
      )}
      {!loadingData && !data && editMode && (
        <CoreAlert type="error" message="Data tidak ditemukan" />
      )}
      {!loadingData && (!editMode || (editMode && data)) && (
        <form
          className="user-form"
          autoComplete="false"
          noValidate
          onSubmit={handleSubmit(() => {
            if (!editMode) {
              if (
                !getValues().password ||
                (getValues().password && getValues().password!.length <= 0)
              ) {
                setError("password", {
                  message: "*Password wajib diisi",
                })
                return
              }
            }
            onOpen()
          })}
        >
          <div className="flex flex-col gap-8">
            <CoreAlert message="Field yang wajib diisi ditandai dengan tanda ( * )" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <CoreInput
                register={register("name", {
                  value: data?.name,
                })}
                label="Nama*"
                errorMessage={errors.name?.message}
              />
              <CoreInput
                register={register("phoneNumber", {
                  value: data?.phoneNumber,
                })}
                label="No.HP*"
                type="tel"
                errorMessage={errors.phoneNumber?.message}
              />
              <CoreInputPassword
                register={register("password")}
                errorMessage={errors.password?.message}
              />
              <CoreInputSelect
                register={register("role", {
                  value: data?.role.id,
                })}
                label="Role*"
                options={roleOptions}
                errorMessage={errors.role?.message}
                onChange={handleRole}
              />
            </div>
            {showLenderForm && (
              <div className="lender-form">
                <h5 className="mb-3 text-xl font-bold">Data Lender :</h5>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <CoreInputSelect
                      register={register("companyId", {
                        value: data?.company?.id,
                      })}
                      label="Company*"
                      options={companies}
                      errorMessage={errors.companyId?.message}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <CoreInputTextArea
                      register={register("address", {
                        value: data?.address,
                      })}
                      label="Alamat"
                      errorMessage={errors.address?.message}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-row gap-2">
              <CoreButton
                type="submit"
                label="Submit"
                className="w-full md:w-auto"
                loading={loadingSubmit}
              />
            </div>
          </div>
        </form>
      )}
      <CoreModalPasswordVerification
        title={"Konfirmasi Permission"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        callback={(isSuccess) => {
          if (isSuccess) {
            doSubmit()
          }
        }}
      />
    </>
  )
}
