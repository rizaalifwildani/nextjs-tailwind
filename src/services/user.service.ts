import { PasswordVerificationRequest } from "@/models/request/passwordVerification.request"
import { UserResponse } from "@/models/response/user.response"

export default class UserService {
  static async profile(): Promise<UserResponse> {
    const res = await fetch("/api/users/profile", {
      method: "GET",
    })
    const data = await res.json()
    return data
  }

  static async passwordVerification(
    req: PasswordVerificationRequest,
  ): Promise<boolean> {
    const res = await fetch("/api/users/password/verification", {
      method: "POST",
      body: JSON.stringify(req),
    })
    const data = await res.json()
    return data
  }
}
