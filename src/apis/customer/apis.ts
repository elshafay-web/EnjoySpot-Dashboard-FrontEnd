import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IList } from '@modules/lookups/core/_models';
import { CommonGetRequestsWithQuery } from '@helpers/helpingFun';
import { IResponse } from '@domains/IResponse';
import { ICustomer, ICustomerGetRequestFilter } from '@domains/ICustomer';
import { HttpPaths } from '@/Enums/httpPaths';

const options = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
};

export const listOfCustomers = async (): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_customers_ListOf);
  return response.data?.data;
};
export const useListOfCustomers = () => {
  const query = useQuery<IList[], Error>({
    queryKey: ['listOfCustomers'],
    queryFn: () => listOfCustomers(),
    ...options,
  });
  return query;
};

export const getAllCustomers = async (
  req: ICustomerGetRequestFilter,
): Promise<ICustomer[]> => {
  const response = await CommonGetRequestsWithQuery(
    HttpPaths.Api_customers_GetAll,
    req,
  );
  return response.data?.data?.data;
};

export const useGetAllCustomers = (req: ICustomerGetRequestFilter) => {
  const query = useQuery<ICustomer[], Error>({
    queryKey: ['getAllCustomers', req],
    queryFn: () => getAllCustomers(req),
  });
  return query;
};

export const deleteCustomer = async (
  id: number,
): Promise<IResponse<number>> => {
  const response = await axios.delete(`${HttpPaths.Api_customers_Delete}${id}`);
  return response.data;
};

export const toggleCustomer = async (
  id: number,
): Promise<IResponse<number>> => {
  const response = await axios.put(
    `${HttpPaths.Api_customers_ToggleIsActive}${id}`,
    {},
  );
  return response.data;
};

export async function UpsertCustomer(
  req: ICustomer,
): Promise<IResponse<ICustomer>> {
  const data = await axios.post(`${HttpPaths.Api_customers_Upsert}`, req);
  return data?.data;
}
