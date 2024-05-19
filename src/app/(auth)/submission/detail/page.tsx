import CoreBreadcrumb from "@/components/core/CoreBreadcrumb"
import { RouterConfig } from "@/configs/router.config"
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline"
import { Metadata } from "next"
import SubmissionForm from "../components/SubmissionForm"

export const metadata: Metadata = {
  title: "Next Tailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function SubmissionDetailPage() {
  return (
    <section className="submission-detail-page">
      <CoreBreadcrumb
        pageName="Detail Pengajuan"
        items={[
          {
            label: "Pengajuan",
            icon: <ClipboardDocumentIcon className="h-5 w-5" />,
            pathname: RouterConfig.SUBMISSION,
          },
          {
            label: "Detail",
          },
        ]}
      />
      <SubmissionForm />
    </section>
  )
}
