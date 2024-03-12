"use client"
import "@/assets/styles/globals.css"
import "@/assets/styles/satoshi.css"
import useColorMode from "@/hooks/useColorMode"
import "flatpickr/dist/flatpickr.min.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useColorMode()
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
      </body>
    </html>
  )
}
