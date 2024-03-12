import StorageConfig from "@/configs/storage.config"
import { useEffect } from "react"
import useThemeState from "./useTheme"

const useColorMode = () => {
  const { mode, setMode } = useThemeState()

  useEffect(() => {
    const fetchData = async () => {
      const item = StorageConfig.getItem(StorageConfig.COLOR_THEME)
      setMode(item)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const className = "dark"
    const bodyClass = window.document.body.classList
    mode === "dark" ? bodyClass.add(className) : bodyClass.remove(className)
  }, [mode])
}

export default useColorMode
