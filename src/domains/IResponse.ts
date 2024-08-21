/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCode } from 'axios'

export interface IResponse<T> {
  statusCode: HttpStatusCode
  meta: any
  isSuccess: boolean
  message: string
  errors: string[]
  data: T
  isPagenation: boolean
  totalCount: number | null
  idOfAddedObject: number | null
}


