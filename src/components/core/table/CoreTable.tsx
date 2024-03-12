"use client"

import useThemeState from "@/hooks/useTheme"
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
import { ColDef, RowClickedEvent } from "ag-grid-community"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { AgGridReact } from "ag-grid-react"
import { RefObject, useCallback, useMemo } from "react"
import CoreButton from "../button/CoreButton"
import CoreInputSelect from "../input/CoreInputSelect"

export interface ICoreTable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]
  cols: ColDef[]
  tableRef: RefObject<AgGridReact>
  onExportCsv?: () => void
  onRowClicked?: (e: RowClickedEvent) => void
  pagination?: ICoreTablePagination
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

export default function CoreTable({ ...props }: ICoreTable) {
  const { mode } = useThemeState()

  // Apply settings across all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: false,
      editable: false,
      lockPinned: true,
    }
  }, [])

  const handleExportCSV = useCallback(() => {
    if (props.onExportCsv) {
      props.onExportCsv()
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
            height: "70vh",
          }}
        >
          <AgGridReact
            ref={props.tableRef}
            rowData={props.rows}
            columnDefs={props.cols}
            defaultColDef={defaultColDef}
            pagination={false}
            onRowClicked={props.onRowClicked}
            autoSizeStrategy={{
              type: "fitGridWidth",
            }}
            suppressExcelExport={props.onExportCsv ? true : false}
            alwaysShowHorizontalScroll={true}
          />

          {/* === CUSTOM PAGINATION === */}
          {props.pagination && (
            <div
              className="flex items-center justify-end gap-6"
              style={{
                border:
                  "1px solid color-mix(in srgb, transparent, var(--ag-foreground-color) 15%)",
                borderTop: "none",
                padding: "10px 15px",
                borderRadius: "0rem 0rem 0.25rem 0.25rem",
              }}
            >
              <div className="flex items-center gap-1">
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
              <div className="flex items-center gap-1">
                <span className="font-bold">{props.pagination.offset}</span>
                <span className="font-normal">to</span>
                <span className="font-bold">
                  {props.pagination.offset + (props.pagination.perPage ?? 20)}
                </span>
                <span className="font-normal">of</span>
                <span className="font-bold">{props.pagination.totalData}</span>
              </div>
              <div className="flex items-center gap-3">
                {/* === PREV BUTTON === */}
                <ChevronDoubleLeftIcon
                  className={`h-5 w-5 cursor-pointer ${props.pagination.currentPage > 1 ? "text-black" : "text-stroke"}`}
                  onClick={() => {
                    if (props.pagination) {
                      props.pagination.onPageChanged("1")
                    }
                  }}
                />
                <ChevronLeftIcon
                  className={`h-5 w-5 cursor-pointer ${props.pagination.currentPage > 1 ? "text-black" : "text-stroke"}`}
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
                  className={`h-5 w-5 cursor-pointer ${props.pagination.currentPage < props.pagination.totalPage ? "text-black" : "text-stroke"}`}
                  onClick={handleNext}
                />
                <ChevronDoubleRightIcon
                  className={`h-5 w-5 cursor-pointer ${props.pagination.currentPage < props.pagination.totalPage ? "text-black" : "text-stroke"}`}
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
