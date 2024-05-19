import CoreBreadcrumb from "@/components/core/CoreBreadcrumb"
import UserSettingIcon from "@/components/icons/UserSettingIcon"
import { RouterConfig } from "@/configs/router.config"
import { Metadata } from "next"
import PermissionForm from "../components/RoleForm"

export const metadata: Metadata = {
  title: "Next Tailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function RoleFormPage() {
  return (
    <section className="role-form-page">
      <CoreBreadcrumb
        pageName="Form Role"
        items={[
          {
            label: "Role",
            icon: <UserSettingIcon />,
            pathname: RouterConfig.ROLE,
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
