"use client"

import Breadcrumb from "@/components/core/CoreBreadcrumb"
import CoreTable from "@/components/core/table/CoreTable"
import { ProductModel } from "@/models/product.model"
import { ColDef, ValueFormatterParams } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import { useRef } from "react"

export default function HomePage() {
  const tableRef = useRef<AgGridReact>(null)
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

  const tableRows: ProductModel[] = [
    {
      id: "95cf241e-fa50-4361-99a5-be04479bdc77",
      title: "Aqua 1 L",
      category: "Food & Drink",
      qty: 50,
      price: 4500,
    },
  ]

  return (
    <section className="home-page">
      <Breadcrumb pageName="Dashboard" />
      <CoreTable
        tableRef={tableRef}
        cols={tableCols}
        rows={tableRows}
        onRowClicked={(e) => {
          console.log(e.data)
        }}
        pagination={{
          currentPage: 1,
          offset: 0,
          totalData: 20,
          totalPage: 1,
          onOffsetChanged: (e) => {
            console.log(e)
          },
          onPageChanged: (e) => {
            console.log(e)
          },
        }}
      />
    </section>
  )
}
