"use client"

import dataReport from "@/assets/data/reports.json"
import CoreTable from "@/components/core/table/CoreTable"
import CoreTagStatus from "@/components/core/tag/CoreTagStatus"
import { SubmissionResponse } from "@/models/response/submission.response"
import { ColDef, ValueFormatterParams } from "ag-grid-community"
import dayjs from "dayjs"
import { isMobile } from "react-device-detect"

export default function ReportTable() {
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
  ]

  return (
    <div className="report-table">
      <CoreTable
        cols={tableCols}
        rows={dataReport}
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
