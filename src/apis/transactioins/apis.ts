import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CommonGetRequestsWithQuery } from '@helpers/helpingFun';
import { IResponse } from '@domains/IResponse';
import {
  IAddTransaction,
  IRefund,
  ITransaction,
  ITransactionRequestFilter,
} from '@domains/ITransactions';
import { HttpPaths } from '@/Enums/httpPaths';

export const getAllTransactions = async (
  req: ITransactionRequestFilter,
): Promise<ITransaction[]> => {
  const response = await CommonGetRequestsWithQuery(
    HttpPaths.Api_transactions_GetAll,
    req,
  );
  return response.data?.data?.data;
};

export const useGetAllTransactions = (req: ITransactionRequestFilter) => {
  const query = useQuery<ITransaction[], Error>({
    queryKey: ['getAllTransactions', req],
    queryFn: () => getAllTransactions(req),
  });
  return query;
};

export async function addTransaction(
  req: IAddTransaction,
): Promise<IResponse<string>> {
  const data = await axios.post(`${HttpPaths.Api_transactions_Add}`, req);
  return data?.data;
}
export async function refund(req: IRefund): Promise<IResponse<string>> {
  const data = await axios.post(`${HttpPaths.Api_transactions_Refund}`, req);
  return data?.data;
}
