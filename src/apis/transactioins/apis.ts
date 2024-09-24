import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CommonGetRequestsWithQuery } from '@helpers/helpingFun';
import { IResponse } from '@domains/IResponse';
import { ICustomer, ICustomerGetRequestFilter } from '@domains/ICustomer';
import { HttpPaths } from '@/Enums/httpPaths';

export const getAllTransactions = async (
  req: ICustomerGetRequestFilter,
): Promise<ICustomer[]> => {
  const response = await CommonGetRequestsWithQuery(
    HttpPaths.Api_transactions_GetAll,
    req,
  );
  return response.data?.data?.data;
};

export const useGetAllTransactions = (req: ICustomerGetRequestFilter) => {
  const query = useQuery<ICustomer[], Error>({
    queryKey: ['getAllTransactions', req],
    queryFn: () => getAllTransactions(req),
  });
  return query;
};

export async function addTransaction(
  req: ICustomer,
): Promise<IResponse<ICustomer>> {
  const data = await axios.post(`${HttpPaths.Api_transactions_Add}`, req);
  return data?.data;
}
export async function refund(req: ICustomer): Promise<IResponse<ICustomer>> {
  const data = await axios.post(`${HttpPaths.Api_transactions_Refund}`, req);
  return data?.data;
}
