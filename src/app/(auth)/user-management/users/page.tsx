import CoreBreadcrumb from "@/components/core/CoreBreadcrumb"
import { Metadata } from "next"
import UserTable from "./components/UserTable"

export const metadata: Metadata = {
  title: "Next Tailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function UserPage() {
  return (
    <section className="user-page">
      <CoreBreadcrumb pageName="User" />
      <UserTable />
    </section>
  )
}
