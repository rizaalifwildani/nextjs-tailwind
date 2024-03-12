"use client"

import { RouterConfig } from "@/configs/router.config"
import Link from "next/link"
import { usePathname } from "next/navigation"
type BreadcrumbProps = {
  pageName: string
}
export default function CoreBreadcrumb({ pageName }: BreadcrumbProps) {
  const path = usePathname()
  const splitPaths = path.split("/")

  return (
    <div className="core-breadcrumb">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        {path != RouterConfig.DASHBOARD && (
          <nav>
            <ol className="flex items-center gap-2">
              {splitPaths.map((e, i) =>
                i == splitPaths.length - 1 ? (
                  <li
                    key={`breadcrumb-${e == "" ? "dashboard" : e}`}
                    className="font-medium text-primary"
                  >
                    {e}
                  </li>
                ) : (
                  <li key={`breadcrumb-${e == "" ? "dashboard" : e}`}>
                    <Link
                      className="font-medium"
                      href={e == "" ? "/" : `/${e}`}
                    >
                      {e == "" ? "dashboard / " : `${e} / `}
                    </Link>
                  </li>
                ),
              )}
            </ol>
          </nav>
        )}
      </div>
    </div>
  )
}
