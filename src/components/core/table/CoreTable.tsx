"use client"

import useThemeState from "@/hooks/useTheme"
import { PrinterIcon } from "@heroicons/react/24/outline"
import { Card, Pagination } from "@nextui-org/react"
import {
  ColDef,
  RowClickedEvent,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
} from "ag-grid-community"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { AgGridReact } from "ag-grid-react"
import { useCallback, useMemo, useRef, useState } from "react"
import CoreButton from "../button/CoreButton"
import CoreInputSelect from "../input/CoreInputSelect"

export interface ICoreTable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]
  cols: ColDef[]
  onExportCsv?: () => Promise<void>
  additionalButton?: JSX.Element
  onRowClicked?: (e: RowClickedEvent) => void
  pagination?: ICoreTablePagination
  autoSizeStrategy?:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy
  height?: string | number
}

export interface ICoreTablePagination {
  currentPage: number
  perPage?: number
  offset: number
  totalData: number
  totalPage: number
  onOffsetChanged: (e: string) => void
  onPageChanged: (page: number) => void
}

export default function CoreTable({ height = "60vh", ...props }: ICoreTable) {
  const { mode } = useThemeState()

  const tableRef = useRef<AgGridReact>(null)

  // Apply settings across all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: false,
      editable: false,
    }
  }, [])

  const [loadingExportCSV, setLoadingExportCSV] = useState(false)

  const handleExportCSV = useCallback(async () => {
    setLoadingExportCSV(true)
    if (props.onExportCsv) {
      await props.onExportCsv().then(() => {
        tableRef.current!.api.exportDataAsCsv()
        setLoadingExportCSV(false)
      })
    }
  }, [props])

  const handlePagination = (page: number) => {
    if (props.pagination) {
      props.pagination.onPageChanged(page)
    }
  }

  const CustomPagination = () => (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-12 flex items-center justify-center gap-6 md:col-span-4 md:justify-start">
        <Pagination
          color="primary"
          classNames={{
            prev: "bg-white dark:bg-black",
            item: "bg-white dark:bg-black",
            next: "bg-white dark:bg-black",
          }}
          isCompact
          showControls
          total={10}
          initialPage={1}
          onChange={handlePagination}
        />
      </div>

      <div className="col-span-12 flex items-center justify-center gap-2 md:col-span-8 md:justify-end">
        <span className="font-normal">items per page :</span>
        <CoreInputSelect
          initialValue={101}
          options={[
            { label: "10", value: "101" },
            { label: "20", value: "202" },
            { label: "50", value: "505" },
            { label: "100", value: "1001" },
          ]}
          onChange={props.pagination!.onOffsetChanged}
          className="w-20"
        />
        <span className="text-sm font-normal">1 - 10 of 10</span>
      </div>
    </div>
  )

  return (
    <div className="core-table">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {(props.onExportCsv || props.additionalButton) && (
          <div className="flex flex-row justify-between gap-2 align-middle">
            {props.onExportCsv && (
              <CoreButton
                label="Export to CSV"
                onClick={handleExportCSV}
                loading={loadingExportCSV}
                icon={<PrinterIcon className="h-5 w-5" />}
                className="bg-blue-400 font-semibold text-white"
              />
            )}
            {props.additionalButton}
          </div>
        )}
        <Card>
          <div
            className={"ag-theme-quartz w-full"}
            style={{
              height: height,
            }}
          >
            <AgGridReact
              ref={tableRef}
              rowData={props.rows}
              columnDefs={props.cols}
              defaultColDef={defaultColDef}
              pagination={false}
              onRowClicked={props.onRowClicked}
              suppressExcelExport={props.onExportCsv ? true : false}
              alwaysShowHorizontalScroll={true}
              autoSizeStrategy={props.autoSizeStrategy}
              suppressDragLeaveHidesColumns={true}
              suppressCellFocus={true}
            />
          </div>
        </Card>

        {/* === CUSTOM PAGINATION === */}
        {props.pagination && <CustomPagination />}
      </div>

      <style jsx global>{`
        .ag-root {
          overflow: scroll !important;
        }
        .ag-theme-quartz,
        .ag-theme-quartz-dark {
          --ag-foreground-color: ${mode == "light" ? "#1B222C" : "white"};
          --ag-background-color: ${mode == "light" ? "#FFF" : "#23303F"};
          --ag-header-foreground-color: ${mode == "light"
            ? "#1B222C"
            : "white"};
          --ag-header-background-color: ${mode == "light"
            ? "#F4CE37"
            : "#1B222C"};
          --ag-odd-row-background-color: ${mode == "light"
            ? "#F4F4F5"
            : "#1B222C"};
          --ag-header-column-resize-handle-color: #1b222c;

          --ag-font-size: 14px;
          --ag-font-family: "Lato";
        }
      `}</style>
    </div>
  )
}
