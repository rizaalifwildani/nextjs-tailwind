import { PermissionResponse } from "./permission.response"

export const SUPERADMIN = "superadmin"
export const LENDER = "lender"
export const CHECKER = "checker"
export const MAKER = "maker"

export interface RoleResponse {
  id: string
  name: string
  displayName: string
  description?: string
  permissions?: PermissionResponse[]
}
