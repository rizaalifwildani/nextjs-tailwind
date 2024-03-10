import AuthLayout from "@/components/layouts/AuthLayout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "NextTailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function Home() {
  return (
    <>
      <AuthLayout>
        <h1>Home</h1>
      </AuthLayout>
    </>
  )
}
