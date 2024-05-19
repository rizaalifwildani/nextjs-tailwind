import CoreBreadcrumb from "@/components/core/CoreBreadcrumb"
import UserSettingIcon from "@/components/icons/UserSettingIcon"
import { RouterConfig } from "@/configs/router.config"
import { Metadata } from "next"
import PermissionForm from "../components/PermissionForm"

export const metadata: Metadata = {
  title: "Next Tailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function PermissionFormPage() {
  return (
    <section className="permission-form-page">
      <CoreBreadcrumb
        pageName="Form Permission"
        items={[
          {
            label: "Permission",
            icon: <UserSettingIcon />,
            pathname: RouterConfig.PERMISSION,
          },
          {
            label: "Form",
          },
        ]}
      />
      <PermissionForm />
    </section>
  )
}
