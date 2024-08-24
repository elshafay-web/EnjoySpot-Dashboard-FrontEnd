/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export interface ILookups {
  moduleName: string;
  routing: string;
  menuRouting: string;
  title: string;
  icon: string;
  addApi: string;
  deleteApi: string;
  toggleApi: string;
  getApi: string;
  inputs: Array<IInputShape>;
  columns: Array<{
    field: string | CallableFunction;
    header: string;
    isDate?: boolean;
    isBoolean?: { value: boolean; iconTrue: string; iconFalse: string };
  }>;
  className: string;
  requireCompanyId: boolean;
}

export interface IInputShape {
  name: string;
  title: string;
  value: any;
  isDropDown: boolean;
  isCheckBox: boolean;
  isMultiSelect: boolean;
  isTextArea: boolean;
  isInput: boolean;
  supplayDataURL: string;
  supplayData: Array<any>;
  isRequired: boolean;
  minLength: number;
  maxLength: number;
}

export interface IGetLookup {
  id: number;
  name: string;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
  isDeleted?: boolean;
  webColor?: string;
  mobileColor?: string;
  webIcon?: string;
  mobileIcon?: string;
  isRequestByCustomerOnly?: boolean;
  isOnePerson?: boolean;
}

export interface IPostLookup {
  id: number;
  name?: string;
  nameEn: string;
  nameAr: string;
  sysName?: string;
  company_Id?: number;
  isActive?: boolean;
  isDeleted?: boolean;
}
export interface IList {
  id: number;
  name: string;
}

export interface InputCreateModel {
  inputName: string;
  title: ReactNode;
  value?: any;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  isPassword?: boolean;
  isNumber?: boolean;
}
export interface HeaderColumn {
  field: string | CallableFunction;
  header: string;
  isDate?: boolean;
  isBoolean?: { value: boolean; iconTrue: string; iconFalse: string };
}
