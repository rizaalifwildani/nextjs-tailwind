import CoreBreadcrumb from "@/components/core/CoreBreadcrumb"
import UserSettingIcon from "@/components/icons/UserSettingIcon"
import { RouterConfig } from "@/configs/router.config"
import { Metadata } from "next"
import UserForm from "../components/UserForm"

export const metadata: Metadata = {
  title: "Next Tailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function UserFormPage() {
  return (
    <section className="user-form-page">
      <CoreBreadcrumb
        pageName="Form User"
        items={[
          {
            label: "User",
            icon: <UserSettingIcon />,
            pathname: RouterConfig.USER,
          },
          {
            label: "Form",
          },
        ]}
      />
      <UserForm />
    </section>
  )
}
