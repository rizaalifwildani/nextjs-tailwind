import Link from "next/link"
type BreadcrumbProps = {
  pageName: string
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="core-breadcrumb">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" href="/">
                Dashboard /
              </Link>
            </li>
            <li className="text-primary font-medium">{pageName}</li>
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default Breadcrumb
