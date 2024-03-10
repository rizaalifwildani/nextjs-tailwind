import { NextResponse } from "next/server"
import { getSession } from "./libs/session"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export async function middleware() {
  const session = getSession()
  console.log(session)
  return NextResponse.next()
}
