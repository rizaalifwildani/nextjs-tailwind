"use client"

import dataPermission from "@/assets/data/permissions.json"
import dataRole from "@/assets/data/roles.json"
import CoreAlert from "@/components/core/CoreAlert"
import CoreButton from "@/components/core/button/CoreButton"
import CoreInput from "@/components/core/input/CoreInput"
import CoreInputTextArea from "@/components/core/input/CoreInputTextArea"
import CoreModalPasswordVerification from "@/components/core/modal/CoreModalPasswordVerification"
import { RouterConfig } from "@/configs/router.config"
import { RoleRequest, RoleSchema } from "@/models/request/role.request"
import { RoleResponse } from "@/models/response/role.response"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Checkbox,
  CheckboxGroup,
  Spinner,
  useDisclosure,
} from "@nextui-org/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export default function RoleForm() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const router = useRouter()
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const query = useSearchParams()

  const [loadingData, setLoadingData] = useState(true)
  const [data, setData] = useState<RoleResponse | undefined>()
  const [editMode, setEditMode] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleRequest>({
    resolver: yupResolver(RoleSchema),
  })

  useEffect(() => {
    const fetchData = () => {
      setLoadingData(true)
      setEditMode(false)
      const id = query.get("q")
      if (id) {
        setEditMode(true)
        const find = dataRole.find((v) => v.id == id)
        if (find) {
          setData(find)
          setSelectedPermissions(find.permissions.map((v) => v.id))
        }
      }
      setLoadingData(false)
    }
    fetchData()
  }, [query])

  const doSubmit = async () => {
    if (selectedPermissions.length <= 0) {
      return
    }
    const body = {}
    Object.assign(body, getValues())
    Object.assign(body, {
      permissions: selectedPermissions,
    })
    console.log(body)
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
          router.push(RouterConfig.ROLE)
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
          className="role-form"
          autoComplete="false"
          noValidate
          onSubmit={handleSubmit(onOpen)}
        >
          <div className="flex flex-col gap-5">
            <CoreAlert message="Field yang wajib diisi ditandai dengan tanda ( * )" />
            <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-4">
              <CoreInput
                register={register("name", {
                  value: data?.name,
                })}
                label="Nama Role*"
                errorMessage={errors.name?.message}
              />
              <CoreInput
                register={register("displayName", {
                  value: data?.displayName,
                })}
                label="Nama Tampilan*"
                errorMessage={errors.displayName?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <CoreInputTextArea
                register={register("description", {
                  value: data?.description,
                })}
                label="Deskripsi"
                errorMessage={errors.description?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <CheckboxGroup
                label="Pilih permissions"
                size="md"
                defaultValue={data?.permissions?.map((v) => v.id)}
                onValueChange={(value) => setSelectedPermissions(value)}
              >
                {dataPermission.map((v) => (
                  <Checkbox key={`permission-list-${v.id}`} value={v.id}>
                    {v.displayName}
                  </Checkbox>
                ))}
              </CheckboxGroup>
              {selectedPermissions.length <= 0 && (
                <span className="mb-2 text-xs text-error">
                  *Permissions wajib dipilih minimal 1
                </span>
              )}
            </div>
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
        title={"Konfirmasi Role"}
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
