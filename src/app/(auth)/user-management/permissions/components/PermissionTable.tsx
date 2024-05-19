"use client"

import dataPermission from "@/assets/data/permissions.json"
import CoreButton from "@/components/core/button/CoreButton"
import CoreTable from "@/components/core/table/CoreTable"
import { RouterConfig } from "@/configs/router.config"
import { PermissionResponse } from "@/models/response/permission.response"
import { EyeIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { ColDef } from "ag-grid-community"
import { useRouter } from "next/navigation"

export default function PermissionTable() {
  const router = useRouter()

  const tableCols: ColDef[] = [
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Display Name",
      field: "displayName",
    },
    {
      headerName: "Description",
      field: "description",
    },
    {
      headerName: "Actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: { data: PermissionResponse }) => {
        return (
          <div className="mt-1 flex flex-row gap-2 align-middle">
            <CoreButton
              label="Lihat"
              size="sm"
              icon={<EyeIcon className="h-5 w-5" />}
              onClick={() => {
                router.push(
                  `${RouterConfig.PERMISSION_FORM}?q=${params.data.id}`,
                )
              }}
            />
          </div>
        )
      },
    },
  ]

  return (
    <div className="permission-table">
      <CoreTable
        cols={tableCols}
        rows={dataPermission}
        autoSizeStrategy={{
          type: "fitGridWidth",
        }}
        additionalButton={
          <CoreButton
            label="Tambah"
            icon={<PlusCircleIcon className="h-5 w-5" />}
            onClick={() => router.push(RouterConfig.PERMISSION_FORM)}
          />
        }
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
