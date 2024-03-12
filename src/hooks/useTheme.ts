import { create } from "zustand"

interface ThemeState {
  mode: "light" | "dark"
  // eslint-disable-next-line no-unused-vars
  setMode: (mode: "light" | "dark") => void
}

const useThemeState = create<ThemeState>((set) => ({
  mode: "light",
  setMode: (mode: "light" | "dark") => set({ mode }),
}))

export default useThemeState
