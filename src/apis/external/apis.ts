import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CommonGetRequestsWithQuery } from '@helpers/helpingFun';
import { IResponse } from '@domains/IResponse';
import { IListing } from '@domains/IListing';
import { HttpPaths } from '@/Enums/httpPaths';

export interface IExternalListingFilter {
  PageNumber?: number;
  PageSize?: number;
  supplierID?: number;
  ListingTypeId?: number;
  listingCategoryId?: number;
  cityId?: number;
  Search?: string;
}

export const getExternalListings = async (
  filter: IExternalListingFilter,
): Promise<IListing[]> => {
  const response = await CommonGetRequestsWithQuery(
    HttpPaths.Api_External_GetAll,
    filter,
  );
  return response.data?.data.data;
};

export const useGetExternalListings = (filter: IExternalListingFilter) => {
  const query = useQuery<IListing[], Error>({
    queryKey: ['getExternalListings', filter],
    queryFn: () => getExternalListings(filter),
    enabled: !!filter.supplierID && filter.supplierID > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
  });
  return query;
};

export const syncExternalListings = async (
  supplierId: number,
): Promise<IResponse<string>> => {
  const response = await axios.post(
    `${HttpPaths.Api_External_Sync}${supplierId}`,
  );
  return response.data;
};

export const publishExternalListings = async (
  listingIds: number[],
): Promise<IResponse<string>> => {
  const response = await axios.put(HttpPaths.Api_External_Publish, listingIds);
  return response.data;
};
