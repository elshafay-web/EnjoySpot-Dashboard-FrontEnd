/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponse<T> {
  isSuccess: boolean
  message: string
  errors: string[]
  data: T
  totalCount: number | null
}


