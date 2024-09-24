import { ICustomer } from './ICustomer';

export interface ITransactions {
  customer_Id: number;
  customerData: ICustomer;
  listing_Id: number;
  listingPackage_Id: number;
  startDate: string;
  endDate: string;
}
