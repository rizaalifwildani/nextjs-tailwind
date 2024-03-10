"use client"
type Props = {
  children: React.ReactNode
  className?: string
}

export default function GuestLayout({ className = "", ...props }: Props) {
  return (
    /* <!-- ===== Main Content Start ===== --> */
    <main>
      <div className={`mx-auto max-w-screen-2xl ${className}`}>
        {props.children}
      </div>
    </main>
    /* <!-- ===== Main Content End ===== --> */
  )
}
