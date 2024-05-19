import CoreBreadcrumb from "@/components/core/CoreBreadcrumb"
import { RouterConfig } from "@/configs/router.config"
import { BuildingOffice2Icon } from "@heroicons/react/24/outline"
import { Metadata } from "next"
import CompanyForm from "../components/CompanyForm"

export const metadata: Metadata = {
  title: "Next Tailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function CompanyFormPage() {
  return (
    <section className="company-form-page">
      <CoreBreadcrumb
        pageName="Form Company"
        items={[
          {
            label: "Company",
            icon: <BuildingOffice2Icon />,
            pathname: RouterConfig.COMPANY,
          },
          {
            label: "Form",
          },
        ]}
      />
      <CompanyForm />
    </section>
  )
}
