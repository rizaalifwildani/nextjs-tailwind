import CoreBreadcrumb from "@/components/core/CoreBreadcrumb"
import Dashboard from "@/components/modules/Dashboard"
import { ProductModel } from "@/models/product.model"

export default function RootPage() {
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
    <section className="root-page">
      <CoreBreadcrumb pageName="Dashboard" />
      <Dashboard data={data} />
    </section>
  )
}
