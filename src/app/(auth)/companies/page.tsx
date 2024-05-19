import CoreBreadcrumb from "@/components/core/CoreBreadcrumb"
import { Metadata } from "next"
import CompanyTable from "./components/CompanyTable"

export const metadata: Metadata = {
  title: "Next Tailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function CompanyPage() {
  return (
    <section className="company-page">
      <CoreBreadcrumb pageName="Company" />
      <CompanyTable />
    </section>
  )
}
