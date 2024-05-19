"use client"

import dataCompany from "@/assets/data/companies.json"
import CoreAlert from "@/components/core/CoreAlert"
import CoreButton from "@/components/core/button/CoreButton"
import CoreInput from "@/components/core/input/CoreInput"
import CoreInputTextArea from "@/components/core/input/CoreInputTextArea"
import CoreModalPasswordVerification from "@/components/core/modal/CoreModalPasswordVerification"
import { RouterConfig } from "@/configs/router.config"
import { CompanyRequest, CompanySchema } from "@/models/request/company.request"
import { CompanyResponse } from "@/models/response/company.response"
import { yupResolver } from "@hookform/resolvers/yup"
import { Spinner, useDisclosure } from "@nextui-org/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export default function CompanyForm() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const router = useRouter()
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const query = useSearchParams()

  const [loadingData, setLoadingData] = useState(true)
  const [data, setData] = useState<CompanyResponse | undefined>()
  const [editMode, setEditMode] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyRequest>({
    resolver: yupResolver(CompanySchema),
  })

  useEffect(() => {
    const fetchData = () => {
      setLoadingData(true)
      setEditMode(false)
      const id = query.get("q")
      if (id) {
        setEditMode(true)
        const find = dataCompany.find((v) => v.id == id)
        if (find) {
          setData(find)
        }
      }
      setLoadingData(false)
    }
    fetchData()
  }, [query])

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
          router.push(RouterConfig.COMPANY)
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
          className="company-form"
          autoComplete="false"
          noValidate
          onSubmit={handleSubmit(onOpen)}
        >
          <div className="flex flex-col gap-8">
            <CoreAlert message="Field yang wajib diisi ditandai dengan tanda ( * )" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <CoreInput
                register={register("name", {
                  value: data?.name,
                })}
                label="Nama Company*"
                errorMessage={errors.name?.message}
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
        title={"Konfirmasi Company"}
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
