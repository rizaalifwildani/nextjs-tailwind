type Props = {
  children: React.ReactNode
  padding?: string | number
}

export default function CoreCard({ padding = 20, ...props }: Props) {
  return (
    <div className="core-card">
      <div
        className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        style={{
          padding,
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
