import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { HttpPaths } from '@/Enums/httpPaths'
import { IList } from '@modules/lookups/core/_models'
import { CommonGetRequestsWithQuery } from '@helpers/helpingFun'
import { IResponse } from '@domains/IResponse'
import { IListing, IListingGetRequestFilter } from '@domains/IListing'
const options = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
}

export const listOfListings = async (): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_Listing_ListOf)
  return response.data?.data
}
export const useListOfListings = () => {
  const query = useQuery<IList[], Error>({
    queryKey: ['listOfListings'],
    queryFn: () => listOfListings(),
    ...options
  })
  return query
}
export const getAllListings = async (
  req: IListingGetRequestFilter
): Promise<IListing[]> => {
  const response = await CommonGetRequestsWithQuery(
    HttpPaths.Api_Listing_GetAll,
    req
  )
  return response.data?.data.data
}

export const useGetAllListings = (req: IListingGetRequestFilter) => {
  const query = useQuery<IListing[], Error>({
    queryKey: ['getAllListings', req],
    queryFn: () => getAllListings(req),
  })
  return query
}

export const getListingProfile = async (
  id: number
): Promise<IListing> => {
  if(!id || id === 0) return {} as IListing
  const response = await CommonGetRequestsWithQuery(
    HttpPaths.Api_Listing_Profile+id,
    {}
  )
  return response.data?.data
}

export const useGetListingProfile = (id: number) => {
  const query = useQuery<IListing, Error>({
    queryKey: ['getListingProfile', id],
    queryFn: () => getListingProfile(id),
  })
  return query
}

export const deleteListing = async (
  id: number
): Promise<IResponse<string>> => {
  const response = await axios.delete(`${HttpPaths.Api_Listing_Delete}${id}`)
  return response.data
}

export const toggleListing = async (
  id: number
): Promise<IResponse<string>> => {
  const response = await axios.put(
    `${HttpPaths.Api_Listing_ToggleIsActive}${id}`,
    {}
  )
  return response.data
}

export async function UpsertListing(req: FormData):Promise<IResponse<IListing>> {
  const data = await axios.post(`${HttpPaths.Api_Listing_Upsert}`, req, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data?.data
}




