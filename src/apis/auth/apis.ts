/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { HttpPaths } from '@/Enums/httpPaths'
import { IResponse } from '@domains/IResponse'
import { LoginRequest, LoginResponse } from '@domains/IUser'

export const login = async (req: LoginRequest): Promise<IResponse<LoginResponse>> => {
  const response = await axios.post(HttpPaths.Api_Login, req)
  return response.data
}

type ILoginReq = {
  onSuccess?: (
    data: IResponse<LoginResponse>,
    variables: LoginRequest,
    context: any
  ) => void
  onError?: (err: Error) => void
  onMutate?: (req: LoginRequest) => IResponse<LoginResponse>
}

export const useLogin = ({ onSuccess }: ILoginReq) => {
  const mutate = useMutation<
    IResponse<LoginResponse>,
    Error,
    LoginRequest,
    () => void
  >({
    onSuccess,
    mutationFn: a => login(a),
  })
  return mutate
}
