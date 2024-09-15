export interface UserData {
  hq?: boolean;
  exp?: number;
  email: string;
  uid: number;
  companyCode: string;
  branchid: number;
  employeeid: number;
  companyid: number;
  roles: Array<string>;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  nationality_Id: number;
  country_Id: number;
  email: string;
  userName: string;
  password: string;
  phoneNumber: string;
  isActive: boolean;
  fullName: string;
  normalizedEmail: string;
  normalizedUserName: string;
  phoneNumberConfirmed: boolean;
  emailConfirmed: boolean;
}

export interface IUserGetRequestFilter {
  isActive: boolean;
  Search: string;
}
