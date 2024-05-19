import CoreBreadcrumb from "@/components/core/CoreBreadcrumb"
import { Metadata } from "next"
import SubmissionTable from "./components/SubmissionTable"

export const metadata: Metadata = {
  title: "Next Tailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function SubmissionPage() {
  return (
    <section className="submission-page">
      <CoreBreadcrumb pageName="Pengajuan" />
      <SubmissionTable />
    </section>
  )
}
