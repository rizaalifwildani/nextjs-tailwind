import Breadcrumb from "@/components/core/CoreBreadcrumb"
import Dashboard from "@/components/pages/Dashboard"
import { ProductModel } from "@/models/product.model"

export default function HomePage() {
  const data: ProductModel[] = [
    {
      id: "95cf241e-fa50-4361-99a5-be04479bdc77",
      title: "Aqua 1 L",
      category: "Food & Drink",
      qty: 50,
      price: 4500,
    },
  ]

  return (
    <section className="home-page">
      <Breadcrumb pageName="Dashboard" />
      <Dashboard data={data} />
    </section>
  )
}
