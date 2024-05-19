import { getSession } from "@/libs/session"

export async function GET() {
  const session = await getSession()

  return Response.json(session.user, { status: 200 })
}
