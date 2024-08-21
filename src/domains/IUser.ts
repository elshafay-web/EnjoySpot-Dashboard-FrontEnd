/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCode } from 'axios';

export interface UserToken {
  // [x: string]: string;
  hq?: boolean;
  exp?: number;
  email: string;
  uid: number;
  companyCode: string;
  branchid: number;
  employeeid: number;
  companyid: number;
  roles: string;
}

export interface IResponse<T> {
  statusCode: HttpStatusCode;
  meta: any;
  isSuccess: boolean;
  message: string;
  errors: string[];
  data: T;
  isPagenation: boolean;
  totalCount: number | null;
  idOfAddedObject: number | null;
}