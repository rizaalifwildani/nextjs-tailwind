import CoreBreadcrumb from "@/components/core/CoreBreadcrumb"
import { Metadata } from "next"
import ReportTable from "./components/ReportTable"

export const metadata: Metadata = {
  title: "Next Tailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function ReportPage() {
  return (
    <section className="report-page">
      <CoreBreadcrumb pageName="Report" />
      <ReportTable />
    </section>
  )
}
