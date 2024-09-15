import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IList } from '@modules/lookups/core/_models';
import { CommonGetRequestsWithQuery } from '@helpers/helpingFun';
import { IResponse } from '@domains/IResponse';
import { IUser, IUserGetRequestFilter } from '@domains/IUser';
import { HttpPaths } from '@/Enums/httpPaths';

const options = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
};

export const listOfUsers = async (): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_users_ListOf);
  return response.data?.data;
};
export const useListOfUsers = () => {
  const query = useQuery<IList[], Error>({
    queryKey: ['listOfUsers'],
    queryFn: () => listOfUsers(),
    ...options,
  });
  return query;
};

export const getAllUsers = async (
  req: IUserGetRequestFilter,
): Promise<IUser[]> => {
  const response = await CommonGetRequestsWithQuery(
    HttpPaths.Api_users_GetAll,
    req,
  );
  return response.data?.data;
};

export const useGetAllUsers = (req: IUserGetRequestFilter) => {
  const query = useQuery<IUser[], Error>({
    queryKey: ['getAllUsers', req],
    queryFn: () => getAllUsers(req),
  });
  return query;
};

export const deleteUser = async (id: string): Promise<IResponse<string>> => {
  const response = await axios.delete(`${HttpPaths.Api_users_Delete}${id}`);
  return response.data;
};

export const toggleUser = async (id: string): Promise<IResponse<string>> => {
  const response = await axios.put(
    `${HttpPaths.Api_users_ToggleIsActive}${id}`,
    {},
  );
  return response.data;
};

export async function UpsertUser(req: IUser): Promise<IResponse<IUser>> {
  const data = await axios.post(`${HttpPaths.Api_users_Upsert}`, req);
  return data?.data;
}
