import { Metadata } from "next"

export const metadata: Metadata = {
  title: "NextTailwind",
  description: "This is Next.js Template with Tailwind UI Framework",
}

export default function HomePage() {
  return (
    <section className="home-page">
      <h1>Home</h1>
    </section>
  )
}
