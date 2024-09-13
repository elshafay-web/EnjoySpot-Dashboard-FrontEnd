/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISupplier {
  id: number;
  email: string;
  name: string;
  officeAddress: string;
  landlineOrMobile: string;
  licenseNumber: string;
  manager: string;
  managerContactNumber: string;
  attachmentLicenseFile: any;
  attachment_License_ExpireDate: string;
  attachmentAgreementFile: any;
  attachment_Agreement_ExpireDate: string;
  attachment_License_ImagePath: string;
  attachment_Agreement_ImagePath: string;
  country_Id: number;
  city_Id: number;
  isActive: boolean;
}
export interface ISupplierListGetRequestFilter {
  pageNumber: number;
  pageSize: number;
  cityId: number;
  search: string;
  country_Id: number;
  isActive: boolean;
  LicenseNumber: string;
  User_Id: number;
}
