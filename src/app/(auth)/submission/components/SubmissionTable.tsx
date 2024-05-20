"use client"

import dataSubmission from "@/assets/data/submissions.json"
import CoreButton from "@/components/core/button/CoreButton"
import CoreTable from "@/components/core/table/CoreTable"
import CoreTagStatus from "@/components/core/tag/CoreTagStatus"
import { RouterConfig } from "@/configs/router.config"
import useProfile from "@/hooks/useProfile"
import { CHECKER, LENDER, MAKER } from "@/models/response/role.response"
import { SubmissionResponse } from "@/models/response/submission.response"
import StatusUtil from "@/utils/status.util"
import { EyeIcon } from "@heroicons/react/24/outline"
import { Spinner } from "@nextui-org/react"
import { ColDef, ValueFormatterParams } from "ag-grid-community"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { isMobile } from "react-device-detect"

export default function SubmissionTable() {
  const router = useRouter()

  const tableCols: ColDef[] = [
    {
      headerName: "Status",
      field: "status",
      width: 130,
      pinned: true,
      lockPinned: true,
      cellRenderer: (params: { data: SubmissionResponse }) => {
        return <CoreTagStatus status={params.data.status} />
      },
    },
    {
      headerName: "Date",
      field: "submissionDate",
      pinned: !isMobile,
      valueFormatter: (params: ValueFormatterParams) => {
        return dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")
      },
    },
    {
      headerName: "Sales ID",
      field: "salesId",
    },
    {
      headerName: "Company ID",
      field: "companyId",
    },
    {
      headerName: "Product ID",
      field: "productId",
    },
    {
      headerName: "Application ID",
      field: "applicationId",
    },
    {
      headerName: "Nama Nasabah",
      field: "customerName",
    },
    {
      headerName: "No.KTP",
      field: "ktp",
    },
    {
      headerName: "No.HP",
      field: "phoneNumber",
    },
    {
      headerName: "No.WhatsApp",
      field: "whatsAppNumber",
    },
    {
      headerName: "Email",
      field: "email",
    },
    {
      headerName: "Nominal Pengajuan",
      field: "submissionAmount",
      valueFormatter: (params: ValueFormatterParams) => {
        return "Rp " + params.value.toLocaleString()
      },
    },
    {
      headerName: "Actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: { data: SubmissionResponse }) => {
        return (
          <div className="mt-1 flex flex-row gap-2 align-middle">
            <CoreButton
              label="Lihat"
              size="sm"
              icon={<EyeIcon className="h-5 w-5" />}
              onClick={() => {
                router.push(
                  `${RouterConfig.SUBMISSION_DETAIL}?q=${params.data.id}`,
                )
              }}
            />
          </div>
        )
      },
    },
  ]

  const { profile } = useProfile()
  const [loadingData, setLoadingData] = useState(true)
  const [submissions, setSubmissions] = useState<SubmissionResponse[]>([])

  useEffect(() => {
    const fetchData = () => {
      setLoadingData(true)
      if (profile?.role.name == CHECKER) {
        const filterData = dataSubmission.filter(
          (v) => v.status == StatusUtil.INPROCESS,
        )
        setSubmissions(filterData)
      } else if (profile?.role.name == MAKER) {
        const filterData = dataSubmission.filter(
          (v) => v.status == StatusUtil.OPEN || v.status == StatusUtil.REOPEN,
        )
        setSubmissions(filterData)
      } else if (profile?.role.name == LENDER) {
        const filterData = dataSubmission.filter(
          (v) =>
            v.status == StatusUtil.INPROCESS ||
            v.status == StatusUtil.APPROVED ||
            v.status == StatusUtil.DISBURSE,
        )
        setSubmissions(filterData)
      } else {
        setSubmissions(dataSubmission)
      }
      setLoadingData(false)
    }
    fetchData()
  }, [profile])

  return (
    <div className="submission-table">
      {loadingData && (
        <div className="flex flex-col gap-3 text-center">
          <Spinner />
          <span>Sedang mengunduh data . . .</span>
        </div>
      )}
      {!loadingData && (
        <CoreTable
          cols={tableCols}
          rows={submissions}
          onExportCsv={() =>
            new Promise<void>((resolve) => {
              setTimeout(() => {
                console.log("exported")
                resolve()
              }, 3000)
            })
          }
          pagination={{
            currentPage: 1,
            offset: 0,
            totalData: 1,
            totalPage: 1,
            onOffsetChanged: (e) => {
              console.log(e)
            },
            onPageChanged: (e) => {
              console.log(e)
            },
          }}
        />
      )}
    </div>
  )
}
