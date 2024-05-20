/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import CoreLogo from "@/components/core/CoreLogo"
import DropdownIcons from "@/components/icons/DropdownIcons"
import UserSettingIcon from "@/components/icons/UserSettingIcon"
import { RouterConfig } from "@/configs/router.config"
import StorageConfig from "@/configs/storage.config"
import useProfile from "@/hooks/useProfile"
import { LENDER, SUPERADMIN } from "@/models/response/role.response"
import { BuildingOffice2Icon } from "@heroicons/react/24/outline"
import { ClipboardDocumentIcon, FolderIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import SidebarLinkGroup from "./SidebarLinkGroup"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname()

  const trigger = useRef<any>(null)
  const sidebar = useRef<any>(null)

  const storedSidebarExpanded = "true"

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  )

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return
      setSidebarOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  useEffect(() => {
    StorageConfig.setItem({
      key: StorageConfig.SIDEBAR,
      value: sidebarExpanded.toString(),
    })
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded")
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded")
    }
  }, [sidebarExpanded])

  const { profile } = useProfile()

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div
        className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5"
        style={{
          height: "70px",
        }}
      >
        <Link href="/">
          <div className="flex items-center gap-3">
            <CoreLogo width={30} />
            <h1 className="text-3xl font-extrabold text-primary">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
          </div>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-2 lg:px-6">
          {/* <!-- Main Menu Group --> */}
          <div>
            <h3 className="mb-3 ml-4 text-sm font-semibold text-bodydark2">
              MAIN MENU
            </h3>

            {/* <!-- Menu Item Submission --> */}
            <MenuItem
              label="Pengajuan"
              pathname={RouterConfig.SUBMISSION}
              icon={<ClipboardDocumentIcon className="h-5.5 w-5.5" />}
            />
            {/* <!-- Menu Item Submission --> */}

            {/* <!-- Menu Item Report --> */}
            {(profile?.role.name == SUPERADMIN ||
              profile?.role.name == LENDER) && (
              <MenuItem
                label="Report"
                pathname={RouterConfig.REPORT}
                icon={<FolderIcon className="h-5.5 w-5.5" />}
              />
            )}
            {/* <!-- Menu Item Report --> */}
          </div>

          {/* <!-- Master Menu Group --> */}
          {profile?.role.name == SUPERADMIN && (
            <div className="mt-6">
              <h3 className="mb-3 ml-4 text-sm font-semibold text-bodydark2">
                MASTER MENU
              </h3>

              <ul className="mb-1 flex flex-col gap-1.5">
                {/* <!-- Menu Item User Management --> */}
                <SidebarLinkGroup
                  activeCondition={pathname.includes(
                    RouterConfig.USER_MANAGEMENT,
                  )}
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`
                          group
                          relative
                          flex
                          items-center
                          gap-2.5
                          rounded-lg
                          px-4 py-2
                          font-medium
                          ${
                            pathname.includes(RouterConfig.USER_MANAGEMENT)
                              ? "text-black"
                              : "text-bodydark1"
                          }
                          duration-300
                          ease-in-out
                          hover:bg-primary
                          hover:text-black
                          dark:hover:bg-primary
                          dark:hover:text-black
                          ${
                            pathname.includes(RouterConfig.USER_MANAGEMENT) &&
                            "bg-primary dark:bg-primary"
                          }`}
                          onClick={(e) => {
                            e.preventDefault()
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true)
                          }}
                        >
                          {/* <UserGroupIcon className="h-5.5 w-5.5" /> */}
                          <UserSettingIcon />
                          User Management
                          <DropdownIcons open={open} />
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && "hidden"
                          }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href={RouterConfig.USER}
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === RouterConfig.USER && "text-white"
                                }`}
                              >
                                Users
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={RouterConfig.ROLE}
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === RouterConfig.ROLE && "text-white"
                                }`}
                              >
                                Roles
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={RouterConfig.PERMISSION}
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === RouterConfig.PERMISSION &&
                                  "text-white"
                                }`}
                              >
                                Permissions
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    )
                  }}
                </SidebarLinkGroup>
                {/* <!-- Menu Item User Management --> */}
              </ul>

              {/* <!-- Menu Item Company --> */}
              <MenuItem
                label="Company"
                pathname={RouterConfig.COMPANY}
                icon={<BuildingOffice2Icon className="h-5.5 w-5.5" />}
              />
              {/* <!-- Menu Item Company --> */}
            </div>
          )}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  )
}

type MenuItemProps = {
  pathname: string
  label: string
  icon: React.ReactNode
}

const MenuItem = ({ ...props }: MenuItemProps) => {
  const pathname = usePathname()
  return (
    <ul className="mb-1.5 flex flex-col gap-1.5">
      {/* <!-- Menu Item --> */}
      <li>
        <Link
          href={props.pathname}
          className={`
            group
            relative
            flex
            items-center
            gap-2.5
            rounded-lg
            px-4
            py-2
            font-medium
            ${props.pathname === pathname ? "text-black" : "text-bodydark1"}
            duration-300
            ease-in-out
            hover:bg-primary
            hover:text-black
            dark:hover:bg-primary
            dark:hover:text-black
            ${props.pathname === pathname && "bg-primary dark:bg-primary"}
          `}
        >
          {props.icon}
          {props.label}
        </Link>
      </li>
      {/* <!-- Menu Item --> */}
    </ul>
  )
}
