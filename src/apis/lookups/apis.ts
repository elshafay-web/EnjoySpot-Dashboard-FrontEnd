import { HttpPaths } from '@Enums/httpPaths'
import { IList } from '@modules/lookups/core/_models'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const options = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
}

export const listOfCities = async (id: number): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_City_ListOf + id)
  return response.data?.data
}

export const useListOfCities = (id: number) => {
  const query = useQuery<IList[]>({
    queryKey: ['listOfCities', id],
    queryFn: () => listOfCities(id),
    ...options,
  })
  return query
}

export const listOfCountries = async (): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_Country_ListOf)
  return response.data?.data
}

export const useListOfCountries = () => {
  const query = useQuery<IList[]>({
    queryKey: ['listOfCountries'],
    queryFn: () => listOfCountries(),
    ...options,
  })
  return query
}

export const listOfListingCategories = async (): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_listingCategories_ListOf)
  return response.data?.data
}

export const useListOfListingCategories = () => {
  const query = useQuery<IList[]>({
    queryKey: ['listOfListingCategories'],
    queryFn: () => listOfListingCategories(),
    ...options,
  })
  return query
}

export const listOfListingCategoriesWithListTypeId = async (
  id: number
): Promise<IList[]> => {
  const response = await axios.get(
    HttpPaths.Api_listingCategories_ListOf_WithListTypeId + id
  )
  return response.data?.data
}

export const useListOfListingCategoriesWithListTypeId = (id: number) => {
  const query = useQuery<IList[]>({
    queryKey: ['listOfListingCategoriesWithListTypeId ', id],
    queryFn: () => listOfListingCategoriesWithListTypeId(id),
    ...options,
  })
  return query
}

export const listOfListingAmenities = async (): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_listingAmenities_ListOf)
  return response.data?.data
}

export const useListOfListingAmenities = () => {
  const query = useQuery<IList[]>({
    queryKey: ['listOfListingAmenities'],
    queryFn: () => listOfListingAmenities(),
    ...options,
  })
  return query
}

export const listOfListingDetails = async (): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_listingCategoryDetails_ListOf)
  return response.data?.data
}

export const useListOfListingDetails = () => {
  const query = useQuery<IList[]>({
    queryKey: ['listOfListingDetails'],
    queryFn: () => listOfListingDetails(),
    ...options,
  })
  return query
}

export const listOfEnteringment = async (): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_listingEntertainments_ListOf)
  return response.data?.data
}

export const useListOfEnteringment = () => {
  const query = useQuery<IList[]>({
    queryKey: ['listOfEnteringment'],
    queryFn: () => listOfEnteringment(),
    ...options,
  })
  return query
}

export const listOfListingTypes = async (): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_listingType_ListOf)
  return response.data?.data
}

export const useListOfListingTypes = () => {
  const query = useQuery<IList[]>({
    queryKey: ['listOfListingTypes'],
    queryFn: () => listOfListingTypes(),
    ...options,
  })
  return query
}
