import CoreBreadcrumb from "@/components/core/CoreBreadcrumb"
import { Metadata } from "next"
import RoleTable from "./components/RoleTable"

export const metadata: Metadata = {
  title: "Next Tailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function RolePage() {
  return (
    <section className="role-page">
      <CoreBreadcrumb pageName="Role" />
      <RoleTable />
    </section>
  )
}
