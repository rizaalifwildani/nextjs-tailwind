import { CompanyResponse } from "./company.response"
import { RoleResponse } from "./role.response"

export interface UserResponse {
  id: string
  name: string
  phoneNumber: string
  address?: string
  role: RoleResponse
  company?: CompanyResponse
}
