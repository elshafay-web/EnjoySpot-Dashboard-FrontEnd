import { ICustomer } from './ICustomer';

export interface IAddTransaction {
  customer_Id: number | null;
  customerData: ICustomer | null;
  listing_Id: number | null;
  listingPackage_Id: number | null;
  startDate: string;
  endDate: string;
}
export interface ITransaction {
  id: number;
  listingTypeName: string;
  itemId: number;
  itemName: string;
  listingOrPackage: string;
  hourOrPerson: string;
  isHour: boolean;
  isDone: boolean;
  isExpired: boolean;
  status: string;
  startDate: string;
  endDate: string;
  amount: number;
  customer_Id: number;
  customerName: string;
  supplierName: string;
  isRefund: boolean;
  refundedAmount: number;
  statusNotes: string | null;
}
export interface ITransactionRequestFilter {
  pageNumber: number;
  pageSize: number;
  Customer_Id: number;
  Listing_Id: number;
  ListingPackage_Id: number;
  StartDate: number;
  EndDate: number;
  IsPackage: boolean;
  Status: string;
}

export interface IRefund {
  id: number;
  refundedAmount: number;
  refundedNotes: string;
}
