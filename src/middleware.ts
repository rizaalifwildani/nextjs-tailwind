import { NextRequest, NextResponse } from "next/server"
import { RouterConfig } from "./configs/router.config"
import { getSession } from "./libs/session"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export async function middleware(req: NextRequest) {
  const session = await getSession()
  if (req.nextUrl.pathname !== RouterConfig.LOGIN) {
    if (!session.authenticated) {
      return NextResponse.redirect(new URL(RouterConfig.LOGIN, req.url))
    }
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL(RouterConfig.SUBMISSION, req.url))
    }
  } else {
    if (session.authenticated) {
      return NextResponse.redirect(new URL(RouterConfig.SUBMISSION, req.url))
    }
  }
  return NextResponse.next()
}
