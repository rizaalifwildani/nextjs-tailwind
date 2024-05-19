"use client"
import "@/assets/styles/globals.css"
import "@/assets/styles/lato.css"
import useColorMode from "@/hooks/useColorMode"
import "flatpickr/dist/flatpickr.min.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useColorMode()
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark dark:text-bodydark">{children}</div>
        <ToastContainer />
      </body>
    </html>
  )
}
