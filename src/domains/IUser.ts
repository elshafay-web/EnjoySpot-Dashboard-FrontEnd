export interface UserData {
  hq?: boolean
  exp?: number
  email: string
  uid: number
  companyCode: string
  branchid: number
  employeeid: number
  companyid: number
  roles: Array<string>
}

export interface LoginRequest {
  userName: string
  password: string
}

export interface LoginResponse {
 token : string
}
