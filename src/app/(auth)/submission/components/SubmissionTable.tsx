"use client"

import dataSubmission from "@/assets/data/submissions.json"
import CoreButton from "@/components/core/button/CoreButton"
import CoreTable from "@/components/core/table/CoreTable"
import CoreTagStatus from "@/components/core/tag/CoreTagStatus"
import { RouterConfig } from "@/configs/router.config"
import { SubmissionResponse } from "@/models/response/submission.response"
import { EyeIcon } from "@heroicons/react/24/outline"
import { ColDef, ValueFormatterParams } from "ag-grid-community"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
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

  return (
    <div className="submission-table">
      <CoreTable
        cols={tableCols}
        rows={dataSubmission}
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
    </div>
  )
}
