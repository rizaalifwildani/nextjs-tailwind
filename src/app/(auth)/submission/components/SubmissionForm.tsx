"use client"

import dataCompany from "@/assets/data/companies.json"
import dataSales from "@/assets/data/sales.json"
import dataSubmission from "@/assets/data/submissions.json"
import CoreAlert from "@/components/core/CoreAlert"
import CoreButton from "@/components/core/button/CoreButton"
import CoreInput from "@/components/core/input/CoreInput"
import CoreInputFile from "@/components/core/input/CoreInputFile"
import CoreInputSelect, {
  ICoreInputOptions,
} from "@/components/core/input/CoreInputSelect"
import CoreInputTextArea from "@/components/core/input/CoreInputTextArea"
import CoreModalPasswordVerification from "@/components/core/modal/CoreModalPasswordVerification"
import { RouterConfig } from "@/configs/router.config"
import {
  SubmissionRequest,
  SubmissionSchema,
} from "@/models/request/submission.request"
import { SubmissionResponse } from "@/models/response/submission.response"
import { yupResolver } from "@hookform/resolvers/yup"
import { Spinner, useDisclosure } from "@nextui-org/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const SUBMIT = "submit"
const REJECT = "reject"

export default function SubmissionForm() {
  const masterListGenders: ICoreInputOptions[] = [
    {
      label: "Laki-Laki",
      value: "male",
    },
    {
      label: "Perempuan",
      value: "female",
    },
    {
      label: "Lainnya",
      value: "other",
    },
  ]
  const [companies, setCompanies] = useState<ICoreInputOptions[]>([])
  const [sales, setSales] = useState<ICoreInputOptions[]>([])
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const router = useRouter()
  const [currentActivity, setCurrentActivity] = useState(SUBMIT)
  const [photoKtp, setPhotoKtp] = useState<ArrayBuffer | undefined>()
  const [photoNpwp, setPhotoNpwp] = useState<ArrayBuffer | undefined>()
  const [photoSelfie, setPhotoSelfie] = useState<ArrayBuffer | undefined>()
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const query = useSearchParams()
  const [loadingData, setLoadingData] = useState(true)
  const [data, setData] = useState<SubmissionResponse | undefined>()

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

  useEffect(() => {
    const fetchSales = () => {
      const masterListSales: ICoreInputOptions[] = []
      dataSales.forEach((v) => {
        masterListSales.push({
          label: v.name,
          value: v.id,
        })
      })
      setSales(masterListSales)
    }
    fetchSales()
  }, [])

  useEffect(() => {
    const fetchData = () => {
      setLoadingData(true)
      const id = query.get("q")
      if (id) {
        const find = dataSubmission.find((v) => v.id == id)
        if (find) {
          setData(find)
        }
      }
      setLoadingData(false)
    }
    fetchData()
  }, [query])

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SubmissionRequest>({
    resolver: yupResolver(SubmissionSchema),
  })

  const doReject = async () => {
    router.push(RouterConfig.SUBMISSION)
  }

  const doSubmit = async () => {
    setLoadingSubmit(true)
    onClose()
    if (!photoKtp || !photoSelfie) {
      return
    }
    const body = {}
    Object.assign(body, getValues())
    Object.assign(body, {
      photoKtp,
      photoNpwp,
      photoSelfie,
    })
    console.log(body)
    setTimeout(() => {
      setLoadingSubmit(false)
      withReactContent(Swal)
        .fire({
          title: "Data berhasil di simpan",
          icon: "success",
          confirmButtonText: "Mengerti",
        })
        .finally(() => {
          router.push(RouterConfig.SUBMISSION)
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
      {!loadingData && !data && (
        <CoreAlert type="error" message="Data tidak ditemukan" />
      )}
      {!loadingData && data && (
        <>
          <form
            className="submission-form"
            autoComplete="false"
            noValidate
            onSubmit={handleSubmit(() => {
              setCurrentActivity(SUBMIT)
              onOpen()
            })}
          >
            <div className="flex flex-col gap-8">
              <CoreAlert message="Field yang wajib diisi ditandai dengan tanda ( * )" />
              <div className="box-sales">
                <h5 className="mb-3 text-xl font-bold">
                  Data Sales & Company :
                </h5>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                  <CoreInputSelect
                    register={register("salesId", {
                      value: data.salesId,
                    })}
                    label="Sales ID*"
                    options={sales}
                    errorMessage={errors.salesId?.message}
                  />
                  <CoreInputSelect
                    register={register("companyId", {
                      value: data.companyId,
                    })}
                    label="Company ID*"
                    options={companies}
                    errorMessage={errors.companyId?.message}
                  />
                  <CoreInput
                    register={register("productId", {
                      value: data.productId,
                    })}
                    label="Product ID"
                    errorMessage={errors.productId?.message}
                  />
                </div>
              </div>
              <div className="box-customer">
                <h5 className="mb-3 text-xl font-bold">Data Nasabah :</h5>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                  <CoreInput
                    register={register("customerName", {
                      value: data.customerName,
                    })}
                    label="Nama Nasabah*"
                    errorMessage={errors.customerName?.message}
                  />
                  <CoreInput
                    register={register("ktp", {
                      value: data.ktp,
                    })}
                    label="No.KTP*"
                    errorMessage={errors.ktp?.message}
                  />
                  <CoreInput
                    register={register("placeOfBirth", {
                      value: data.placeOfBirth,
                    })}
                    label="Tempat Lahir*"
                    errorMessage={errors.placeOfBirth?.message}
                  />
                  <CoreInput
                    register={register("birthDate", {
                      value: data.birthDate,
                    })}
                    label="Tanggal Lahir*"
                    type="date"
                    errorMessage={errors.birthDate?.message}
                  />
                  <CoreInput
                    register={register("phoneNumber", {
                      value: data.phoneNumber,
                    })}
                    label="No.HP*"
                    type="tel"
                    errorMessage={errors.phoneNumber?.message}
                  />
                  <CoreInput
                    register={register("whatsAppNumber", {
                      value: data.whatsAppNumber,
                    })}
                    label="No.WhatsApp*"
                    type="tel"
                    errorMessage={errors.whatsAppNumber?.message}
                  />
                  <CoreInput
                    register={register("email", {
                      value: data.email,
                    })}
                    label="Email"
                    type="email"
                    errorMessage={errors.email?.message}
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
                  <CoreInputTextArea
                    register={register("address", {
                      value: data.address,
                    })}
                    label="Alamat KTP*"
                    errorMessage={errors.address?.message}
                  />
                  <CoreInputTextArea
                    register={register("residenceAddress", {
                      value: data.residenceAddress,
                    })}
                    label="Alamat Domisili*"
                    errorMessage={errors.residenceAddress?.message}
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-4">
                  <CoreInput
                    register={register("subdistrict", {
                      value: data.subdistrict,
                    })}
                    label="Kecamatan"
                    errorMessage={errors.subdistrict?.message}
                  />
                  <CoreInput
                    register={register("city", {
                      value: data.city,
                    })}
                    label="Kota*"
                    errorMessage={errors.city?.message}
                  />
                  <CoreInput
                    register={register("postalCode", {
                      value: Number(data.postalCode),
                    })}
                    label="Kode Pos"
                    type="number"
                    errorMessage={errors.postalCode?.message}
                  />
                  <CoreInputSelect
                    register={register("gender", {
                      value: data.gender,
                    })}
                    label="Jenis Kelamin"
                    options={masterListGenders}
                    errorMessage={errors.gender?.message}
                  />
                  <CoreInput
                    register={register("status", {
                      value: data.status,
                    })}
                    label="Status"
                    errorMessage={errors.status?.message}
                  />
                  <CoreInput
                    register={register("work", {
                      value: data.work,
                    })}
                    label="Pekerjaan*"
                    errorMessage={errors.work?.message}
                  />
                  <CoreInput
                    register={register("education", {
                      value: data.education,
                    })}
                    label="Pendidikan"
                    errorMessage={errors.education?.message}
                  />
                  <CoreInput
                    register={register("biologicalMotherMaidenName", {
                      value: data.biologicalMotherMaidenName,
                    })}
                    label="Nama Gadis Ibu Kandung*"
                    errorMessage={errors.biologicalMotherMaidenName?.message}
                  />
                  <CoreInput
                    register={register("emergencyContactName", {
                      value: data.emergencyContactName,
                    })}
                    label="Nama Emergency Contact*"
                    errorMessage={errors.emergencyContactName?.message}
                  />
                  <CoreInput
                    register={register("emergencyContactPhone", {
                      value: data.emergencyContactPhone,
                    })}
                    label="No.HP Emergency Contact*"
                    type="tel"
                    errorMessage={errors.emergencyContactPhone?.message}
                  />
                  <CoreInput
                    register={register("emergencyContactKtp", {
                      value: data.emergencyContactKtp,
                    })}
                    label="No.KTP Emergency Contact*"
                    errorMessage={errors.emergencyContactKtp?.message}
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CoreInputTextArea
                    register={register("emergencyContactAddress", {
                      value: data.emergencyContactAddress,
                    })}
                    label="Alamat Emergency Contact*"
                    errorMessage={errors.emergencyContactAddress?.message}
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-4">
                  <CoreInput
                    register={register("dependentsTotal", {
                      value: `${data.dependentsTotal}`,
                    })}
                    label="Jumlah Tanggungan"
                    errorMessage={errors.dependentsTotal?.message}
                  />
                  <CoreInput
                    register={register("npwpNumber", {
                      value: `${data.npwpNumber}`,
                    })}
                    label="No.NPWP"
                    type="number"
                    errorMessage={errors.npwpNumber?.message}
                  />
                  <CoreInput
                    register={register("lengthOfWork", {
                      value: data.lengthOfWork,
                    })}
                    label="Lama Bekerja*"
                    errorMessage={errors.lengthOfWork?.message}
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CoreInputTextArea
                    register={register("workAddress", {
                      value: data.workAddress,
                    })}
                    label="Alamat Pekerjaan"
                    errorMessage={errors.workAddress?.message}
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-4">
                  <CoreInput
                    register={register("workSubdistrict", {
                      value: data.workSubdistrict,
                    })}
                    label="Kecamatan Pekerjaan"
                    errorMessage={errors.workSubdistrict?.message}
                  />
                  <CoreInput
                    register={register("workCity", {
                      value: data.workCity,
                    })}
                    label="Kota Pekerjaan"
                    errorMessage={errors.workCity?.message}
                  />
                  <CoreInput
                    register={register("workPostalCode", {
                      value: Number(data.workPostalCode),
                    })}
                    label="Kode Pos Pekerjaan"
                    type="number"
                    errorMessage={errors.workPostalCode?.message}
                  />
                  <CoreInput
                    register={register("monthlyIncome", {
                      value: data.monthlyIncome,
                    })}
                    label="Penghasilan Perbulan*"
                    type="number"
                    errorMessage={errors.monthlyIncome?.message}
                  />
                  <CoreInput
                    register={register("annualIncome", {
                      value: Number(data.annualIncome),
                    })}
                    label="Penghasilan Pertahun*"
                    type="number"
                    errorMessage={errors.annualIncome?.message}
                  />
                  <CoreInput
                    register={register("anotherIncome", {
                      value: `${data.anotherIncome}`,
                    })}
                    label="Penghasilan Lainnya"
                    errorMessage={errors.anotherIncome?.message}
                  />
                </div>
                <h5 className="mb-3 mt-5 text-xl font-bold">
                  Data Pengajuan :
                </h5>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                  <CoreInput
                    register={register("submissionAmount", {
                      value: data.submissionAmount,
                    })}
                    label="Nominal Pengajuan*"
                    type="number"
                    errorMessage={errors.submissionAmount?.message}
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
                  <CoreInputFile
                    label="Photo KTP*"
                    errorMessage={
                      !photoKtp ? "*Photo KTP wajib diisi" : undefined
                    }
                    callback={(buffer) => {
                      setPhotoKtp(buffer)
                    }}
                  />
                  <CoreInputFile
                    label="Photo NPWP"
                    callback={(buffer) => setPhotoNpwp(buffer)}
                  />
                  <CoreInputFile
                    label="Photo Selfie dengan KTP*"
                    errorMessage={
                      !photoSelfie
                        ? "*Photo Selfie dengan KTP wajib diisi"
                        : undefined
                    }
                    callback={(buffer) => setPhotoSelfie(buffer)}
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CoreInputTextArea
                    register={register("verificationReason", {
                      value: data.verificationReason,
                    })}
                    label="Reason Verifikasi*"
                    errorMessage={errors.verificationReason?.message}
                  />
                </div>
                <div className="mt-5 flex flex-row gap-2">
                  <CoreButton
                    label="Reject"
                    color="danger"
                    className="w-full md:w-auto"
                    onClick={() => {
                      setCurrentActivity(REJECT)
                      onOpen()
                    }}
                  />
                  <CoreButton
                    type="submit"
                    label="Submit"
                    className="w-full md:w-auto"
                    loading={loadingSubmit}
                  />
                </div>
              </div>
            </div>
          </form>

          <CoreModalPasswordVerification
            title={
              currentActivity == SUBMIT
                ? "Konfirmasi Submit"
                : "Konfirmasi Reject"
            }
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            callback={(isSuccess) => {
              if (isSuccess) {
                if (currentActivity == SUBMIT) {
                  doSubmit()
                } else {
                  doReject()
                }
              }
            }}
          />
        </>
      )}
    </>
  )
}
