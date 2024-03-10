import StorageConfig from "@/configs/storage.config"
import { useEffect, useState } from "react"

const useColorMode = () => {
  const [colorMode, setColorMode] = useState(() => {
    const item = StorageConfig.getItem(StorageConfig.COLOR_THEME)
    return item ?? "light"
  })

  useEffect(() => {
    const className = "dark"
    const bodyClass = window.document.body.classList

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className)
  }, [colorMode])

  return [colorMode, setColorMode]
}

export default useColorMode
