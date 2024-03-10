type Props = {
  children: React.ReactNode
  padding?: string | number
}

export default function CoreCard({ padding = 20, ...props }: Props) {
  return (
    <div
      className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark w-full rounded-sm border bg-white"
      style={{
        padding,
      }}
    >
      {props.children}
    </div>
  )
}
