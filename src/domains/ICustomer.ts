export interface ICustomer {
  id: number;
  nameAr: string;
  nameEn: string;
  name: string;
  email: string;
  landlineOrMobile: string;
  dateOfBirth: Date;
  nationality_Id: number;
  nationalityName: string;
  source: string;
  username: string;
  password: string;
  isActive: boolean;
}

export interface ICustomerGetRequestFilter {
  IsLead?: boolean;
  Search: string;
  IsActive: boolean;
  PageNumber: number;
  PageSize: number;
}
