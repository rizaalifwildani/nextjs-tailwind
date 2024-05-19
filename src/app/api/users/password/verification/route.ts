import users from "@/assets/data/users.json"
import { getSession } from "@/libs/session"
import { PasswordVerificationRequest } from "@/models/request/passwordVerification.request"

export async function POST(req: Request) {
  const body: PasswordVerificationRequest = await req.json()
  const session = await getSession()
  const findUser = users.find((e) => e.username == session.user?.username)

  let isValid = false

  if (findUser) {
    if (body.password == findUser.password) {
      isValid = true
    }
  }

  return Response.json(isValid, { status: 200 })
}
