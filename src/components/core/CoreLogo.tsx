import { Image } from "@nextui-org/react"

type Props = {
  width?: string | number | undefined
}

export default function CoreLogo({ width = 40 }: Props) {
  return (
    <div className="core-logo">
      <Image
        loading="eager"
        src="/_next/image/ic_logo.png"
        alt="logo"
        width={width}
        className="rounded-md bg-white p-1"
      />
    </div>
  )
}
