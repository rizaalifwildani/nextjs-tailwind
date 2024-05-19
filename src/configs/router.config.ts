export class RouterConfig {
  static SUBMISSION = "/submission"
  static SUBMISSION_DETAIL = `${RouterConfig.SUBMISSION}/detail`
  static REPORT = "/report"
  static USER_MANAGEMENT = "/user-management"
  static PERMISSION = `${RouterConfig.USER_MANAGEMENT}/permissions`
  static PERMISSION_FORM = `${RouterConfig.PERMISSION}/form`
  static ROLE = `${RouterConfig.USER_MANAGEMENT}/roles`
  static ROLE_FORM = `${RouterConfig.ROLE}/form`
  static USER = `${RouterConfig.USER_MANAGEMENT}/users`
  static USER_FORM = `${RouterConfig.USER}/form`
  static COMPANY = "/companies"
  static COMPANY_FORM = `${RouterConfig.COMPANY}/form`
  static LOGIN = "/login"
}
