import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { HttpPaths } from '@/Enums/httpPaths'
import { IList } from '@modules/lookups/core/_models'
import { CommonGetRequestsWithQuery } from '@helpers/helpingFun'
import { IResponse } from '@domains/IResponse'
import {
  IListingPackageGetRequestFilter,
  IListingPackages,
} from '@domains/IListingPackage'

export const listOfListingPackages = async (): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_listingPackages_ListOf)
  return response.data?.data
}
export const useListOfListingPackages = () => {
  const query = useQuery<IList[], Error>({
    queryKey: ['listOfListingPackages'],
    queryFn: () => listOfListingPackages(),
  })
  return query
}
export const getAllListingPackages = async (
  req: IListingPackageGetRequestFilter
): Promise<IListingPackages[]> => {
  const response = await CommonGetRequestsWithQuery(
    HttpPaths.Api_listingPackages_GetAll,
    req
  )
  return response.data?.data.data
}

export const useGetAllListingPackages = (
  req: IListingPackageGetRequestFilter
) => {
  const query = useQuery<IListingPackages[], Error>({
    queryKey: ['getAllListingPackages', req],
    queryFn: () => getAllListingPackages(req),
  })
  return query
}

export const deleteListingPackages = async (
  id: number
): Promise<IResponse<string>> => {
  const response = await axios.delete(
    `${HttpPaths.Api_listingPackages_Delete}${id}`
  )
  return response.data
}

export const toggleListingPackages = async (
  id: number
): Promise<IResponse<string>> => {
  const response = await axios.put(
    `${HttpPaths.Api_listingPackages_ToggleIsActive}${id}`,
    {}
  )
  return response.data
}

export async function UpsertListingPackages(
  req: FormData
): Promise<IResponse<IListingPackages>> {
  const data = await axios.post(
    `${HttpPaths.Api_listingPackages_Upsert}`,
    req,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return data?.data
}
