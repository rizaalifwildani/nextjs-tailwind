import CoreBreadcrumb from "@/components/core/CoreBreadcrumb"
import { Metadata } from "next"
import PermissionTable from "./components/PermissionTable"

export const metadata: Metadata = {
  title: "Next Tailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function PermissionPage() {
  return (
    <section className="permission-page">
      <CoreBreadcrumb pageName="Permission" />
      <PermissionTable />
    </section>
  )
}
