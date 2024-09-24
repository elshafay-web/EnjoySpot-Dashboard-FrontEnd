import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CommonGetRequestsWithQuery } from '@helpers/helpingFun';
import { IResponse } from '@domains/IResponse';
import { IPermission, IRole } from '@domains/IRole';
import { IList } from '@modules/lookups/core/_models';
import { HttpPaths } from '@/Enums/httpPaths';

const options = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
};

export const listOfPermissions = async (): Promise<IPermission[]> => {
  const response = await axios.get(HttpPaths.Api_permissions_ListOf);
  return response.data?.data;
};
export const useListOfPermissions = () => {
  const query = useQuery<IPermission[], Error>({
    queryKey: ['listOfPermissions'],
    queryFn: () => listOfPermissions(),
    ...options,
  });
  return query;
};

export const listOfRoles = async (): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_roles_ListOf);
  return response.data?.data;
};
export const useListOfRoles = () => {
  const query = useQuery<IList[], Error>({
    queryKey: ['listOfRoles'],
    queryFn: () => listOfRoles(),
    ...options,
  });
  return query;
};

export const getRoleProfile = async (id: string): Promise<IRole> => {
  if (!id || id.length === 0) return {} as IRole;
  const response = await axios.get(HttpPaths.Api_roles_Profile + id);
  return response.data?.data;
};
export const useGetRoleProfile = (id: string) => {
  const query = useQuery<IRole, Error>({
    queryKey: ['getRoleProfile', id],
    queryFn: () => getRoleProfile(id),
    ...options,
  });
  return query;
};

export const getAllRoles = async (): Promise<IRole[]> => {
  const response = await CommonGetRequestsWithQuery(
    HttpPaths.Api_roles_GetAll,
    {},
  );
  return response.data?.data;
};

export const useGetAllRoles = () => {
  const query = useQuery<IRole[], Error>({
    queryKey: ['getAllRoles'],
    queryFn: () => getAllRoles(),
  });
  return query;
};

export const deleteRole = async (id: string): Promise<IResponse<string>> => {
  const response = await axios.delete(`${HttpPaths.Api_roles_Delete}${id}`);
  return response.data;
};

export const toggleRole = async (id: string): Promise<IResponse<string>> => {
  const response = await axios.put(
    `${HttpPaths.Api_roles_ToggleIsActive}${id}`,
    {},
  );
  return response.data;
};

export async function UpsertRole(req: IRole): Promise<IResponse<IRole>> {
  const data = await axios.post(`${HttpPaths.Api_roles_Upsert}`, req);
  return data?.data;
}
