import { HttpPaths } from '@Enums/httpPaths'
import { IList } from '@modules/lookups/core/_models'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const listOfCities = async (id: number): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_City_ListOf + id)
  return response.data?.data
}

export const useListOfCities = (id: number) => {
  const query = useQuery<IList[]>({
    queryKey: ['listOfCities', id],
    queryFn: () => listOfCities(id),
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
  })
  return query
}
