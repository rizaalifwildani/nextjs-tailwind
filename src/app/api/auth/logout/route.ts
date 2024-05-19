import { getSession } from "@/libs/session"

export async function POST() {
  const session = await getSession()
  session.destroy()

  return Response.json(true, { status: 200 })
}
