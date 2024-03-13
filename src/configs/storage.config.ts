/* eslint-disable @typescript-eslint/no-explicit-any */
type StorageConfigProps = {
  key: string
  value: any | undefined
}

export type StorageThemeConfig = {
  primaryColor: string
  secondaryColor: string
}

export default class StorageConfig {
  static COLOR_THEME = "color-theme"
  static SIDEBAR = "sidebar"

  static async setItem({ ...props }: StorageConfigProps): Promise<boolean> {
    if (typeof window != "undefined") {
      const data = Buffer.from(JSON.stringify(props.value)).toString("base64")
      window.localStorage.setItem(props.key, data)
      return true
    }
    return false
  }

  static getItem(key: string): any {
    if (typeof window != "undefined") {
      const ls = window.localStorage.getItem(key)
      if (ls != null) {
        const data = Buffer.from(ls, "base64").toString()
        return JSON.parse(data)
      }
    }
    return null
  }
}
