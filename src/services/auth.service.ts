import { LoginRequest } from "@/models/request/login.request"

export default class AuthService {
  static async login(req: LoginRequest): Promise<boolean> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(req),
    })
    const data = await res.json()
    return data
  }

  static async logout(): Promise<boolean> {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    })
    const data = await res.json()
    return data
  }
}
