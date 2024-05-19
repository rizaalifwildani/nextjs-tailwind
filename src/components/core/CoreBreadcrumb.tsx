"use client"

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { useRouter } from "next/navigation"

type BreadcrumbItemProps = {
  label: string
  icon?: React.ReactNode
  pathname?: string
}

type BreadcrumbProps = {
  pageName: string
  items?: BreadcrumbItemProps[]
}
export default function CoreBreadcrumb({
  items = [],
  ...props
}: BreadcrumbProps) {
  const router = useRouter()

  return (
    <div className="core-breadcrumb">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {props.pageName}
        </h2>

        {items.length > 0 && (
          <Breadcrumbs
            size="lg"
            separator="/"
            itemClasses={{
              separator: "px-2",
            }}
          >
            {items.map((item) => {
              return (
                <BreadcrumbItem
                  key={`breadcrumb-${item.label}`}
                  onClick={() => {
                    if (item.pathname) {
                      router.push(item.pathname)
                    }
                  }}
                  startContent={item.icon}
                >
                  {item.label}
                </BreadcrumbItem>
              )
            })}
          </Breadcrumbs>
        )}
      </div>
      <div
        style={{
          height: "1px",
        }}
        className="mb-7 w-full bg-bodydark  dark:bg-white"
      />
    </div>
  )
}
