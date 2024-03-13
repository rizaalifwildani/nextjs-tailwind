"use client"

import { ProductModel } from "@/models/product.model"
import { ColDef, ValueFormatterParams } from "ag-grid-community"
import CoreTable from "../core/table/CoreTable"

type Props = {
  data: ProductModel[]
}

export default function Dashboard({ ...props }: Props) {
  const tableCols: ColDef[] = [
    {
      field: "title",
      pinned: true,
    },
    {
      field: "category",
    },
    {
      field: "qty",
    },
    {
      field: "price",
      valueFormatter: (params: ValueFormatterParams) => {
        return "IDR" + params.value.toLocaleString()
      },
    },
  ]

  return (
    <CoreTable
      cols={tableCols}
      rows={props.data}
      onRowClicked={(e) => {
        console.log(e.data)
      }}
      onExportCsv={
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
  )
}
