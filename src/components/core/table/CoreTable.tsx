"use client"

import useThemeState from "@/hooks/useTheme"
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
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
import { useCallback, useMemo, useRef } from "react"
import CoreButton from "../button/CoreButton"
import CoreInputSelect from "../input/CoreInputSelect"

export interface ICoreTable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]
  cols: ColDef[]
  onExportCsv?: () => Promise<void>
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
  onPageChanged: (e: string) => void
}

export default function CoreTable({ height = "60vh", ...props }: ICoreTable) {
  const { mode } = useThemeState()

  const tableRef = useRef<AgGridReact>(null)

  // Apply settings across all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: false,
      editable: false,
      lockPinned: true,
    }
  }, [])

  const handleExportCSV = useCallback(async () => {
    if (props.onExportCsv) {
      await props.onExportCsv().then(() => {
        tableRef.current!.api.exportDataAsCsv()
      })
    }
  }, [props])

  const handlePrev = () => {
    if (props.pagination && props.pagination.currentPage > 1) {
      const page = props.pagination.currentPage - 1
      props.pagination.onPageChanged(`${page}`)
    }
  }

  const handleNext = () => {
    if (
      props.pagination &&
      props.pagination.currentPage < props.pagination.totalPage
    ) {
      const page = props.pagination.currentPage + 1
      props.pagination.onPageChanged(`${page}`)
    }
  }

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
        {props.onExportCsv && (
          <CoreButton
            label="Export CSV"
            onClick={handleExportCSV}
            className="bg-slate-400"
          />
        )}
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
            autoSizeStrategy={
              props.autoSizeStrategy ?? {
                type: "fitGridWidth",
              }
            }
            suppressExcelExport={props.onExportCsv ? true : false}
            alwaysShowHorizontalScroll={true}
          />

          {/* === CUSTOM PAGINATION === */}
          {props.pagination && (
            <div
              style={{
                border:
                  "1px solid color-mix(in srgb, transparent, var(--ag-foreground-color) 15%)",
                borderTop: "none",
                padding: "10px 15px",
                borderRadius: "0rem 0rem 0.25rem 0.25rem",
              }}
            >
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 flex items-center justify-center gap-1 md:col-span-4 md:justify-start">
                  <span className="font-normal">Page Size :</span>
                  <CoreInputSelect
                    initialValue={props.pagination.perPage ?? 20}
                    options={[
                      { label: "10", value: 10 },
                      { label: "20", value: 20 },
                      { label: "50", value: 50 },
                      { label: "100", value: 100 },
                    ]}
                    onChange={props.pagination.onOffsetChanged}
                  />
                </div>
                <div className="col-span-12 flex items-center justify-center gap-6 md:col-span-8 md:justify-end">
                  <div className="flex items-center gap-1">
                    <span className="font-bold">
                      {props.pagination.offset + 1}
                    </span>
                    <span className="font-normal">to</span>
                    <span className="font-bold">
                      {props.pagination.offset + props.rows.length}
                    </span>
                    <span className="font-normal">of</span>
                    <span className="font-bold">
                      {props.pagination.totalData}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* === PREV BUTTON === */}
                    <ChevronDoubleLeftIcon
                      className={`h-5 w-5 ${props.pagination.currentPage > 1 ? "cursor-pointer" : "cursor-not-allowed"}`}
                      onClick={() => {
                        if (props.pagination) {
                          props.pagination.onPageChanged("1")
                        }
                      }}
                    />
                    <ChevronLeftIcon
                      className={`h-5 w-5 ${props.pagination.currentPage > 1 ? "cursor-pointer" : "cursor-not-allowed"}`}
                      onClick={handlePrev}
                    />
                    {/* === END OF PREV BUTTON === */}

                    <div className="flex gap-1">
                      <span className="font-normal">Page</span>
                      <span className="font-bold">
                        {props.pagination.currentPage}
                      </span>
                      <span className="font-normal">of</span>
                      <span className="font-bold">
                        {props.pagination.totalPage}
                      </span>
                    </div>

                    {/* === NEXT BUTTON === */}
                    <ChevronRightIcon
                      className={`h-5 w-5 ${props.pagination.currentPage < props.pagination.totalPage ? "cursor-pointer" : "cursor-not-allowed"}`}
                      onClick={handleNext}
                    />
                    <ChevronDoubleRightIcon
                      className={`h-5 w-5 ${props.pagination.currentPage < props.pagination.totalPage ? "cursor-pointer" : "cursor-not-allowed"}`}
                      onClick={() => {
                        if (props.pagination) {
                          props.pagination.onPageChanged(
                            `${props.pagination.totalPage}`,
                          )
                        }
                      }}
                    />
                    {/* === END OF NEXT BUTTON === */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .ag-root {
          overflow: scroll !important;
        }
        .ag-theme-quartz,
        .ag-theme-quartz-dark {
          --ag-wrapper-border-radius: 0.25rem 0.25rem 0px 0px;
          --ag-foreground-color: ${mode == "light" ? "#1c2434" : "white"};
          --ag-background-color: ${mode == "light" ? "#f1f5f9" : "#1B222C"};
          --ag-header-foreground-color: ${mode == "light"
            ? "#1c2434"
            : "white"};
          --ag-header-background-color: ${mode == "light"
            ? "#FAFAFA"
            : "#23303F"};
          --ag-odd-row-background-color: ${mode == "light"
            ? "white"
            : "#23303F"};
          --ag-header-column-resize-handle-color: #23303f;

          --ag-font-size: 14px;
          --ag-font-family: "Satoshi";
        }
      `}</style>
    </div>
  )
}
