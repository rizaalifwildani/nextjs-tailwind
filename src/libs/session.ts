import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

export interface SessionData {
  authenticated?: boolean
  visitorId?: string
  token?: string
  expired?: number
}

export const sessionOptions = {
  cookieName: process.env.COOKIE_NAME ?? "",
  password: process.env.COOKIE_PASSWORD ?? "",
  cookieOptions: {
    secure: process.env.NODE_ENV != "development",
  },
  ttl: 86400, // 1 day
}

export const getSession = () => {
  const session = getIronSession<SessionData>(cookies(), sessionOptions)
  return session
}
