import users from "@/assets/data/users.json"
import { getSession } from "@/libs/session"
import { LoginRequest } from "@/models/request/login.request"

export async function POST(req: Request) {
  const body: LoginRequest = await req.json()
  const session = await getSession()

  let isLoggedIn = false
  const findUser = users.find((e) => e.phoneNumber == body.phoneNumber)
  if (findUser && findUser.password == body.password) {
    session.authenticated = true
    session.user = findUser
    await session.save()
    isLoggedIn = true
  }

  return Response.json(isLoggedIn, { status: isLoggedIn ? 200 : 422 })
}
