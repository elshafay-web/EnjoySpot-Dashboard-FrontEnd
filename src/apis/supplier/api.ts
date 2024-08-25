import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { HttpPaths } from '@/Enums/httpPaths'
import { IList } from '@modules/lookups/core/_models'
import { ISupplier, ISupplierListGetRequestFilter } from '@domains/ISupplier'
import { CommonGetRequestsWithQuery } from '@helpers/helpingFun'
import { IResponse } from '@domains/IResponse'

export const listOfSupliers = async (): Promise<IList[]> => {
  const response = await axios.get(HttpPaths.Api_Supplier_ListOf)
  return response.data?.data
}
export const useListOfSupppliers = () => {
  const query = useQuery<IList[], Error>({
    queryKey: ['listOfSupliers'],
    queryFn: () => listOfSupliers(),
  })
  return query
}
export const getAllSupppliers = async (
  req: ISupplierListGetRequestFilter
): Promise<ISupplier[]> => {
  const response = await CommonGetRequestsWithQuery(
    HttpPaths.Api_Supplier_GetAll,
    req
  )
  return response.data?.data.data
}

export const useGetAllSupppliers = (req: ISupplierListGetRequestFilter) => {
  const query = useQuery<ISupplier[], Error>({
    queryKey: ['getAllSupppliers', req],
    queryFn: () => getAllSupppliers(req),
  })
  return query
}

export const deleteSupplier = async (
  id: number
): Promise<IResponse<string>> => {
  const response = await axios.delete(`${HttpPaths.Api_Supplier_Delete}${id}`)
  return response.data
}

export const toggleSupplier = async (
  id: number
): Promise<IResponse<string>> => {
  const response = await axios.put(
    `${HttpPaths.Api_Supplier_ToggleIsActive}${id}`,
    {}
  )
  return response.data
}

export async function UpsertSupplier(req: FormData):Promise<IResponse<ISupplier>> {
  const data = await axios.post(`${HttpPaths.Api_Supplier_Upsert}`, req, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data?.data
}




