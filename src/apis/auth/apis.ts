/* eslint-disable no-spaced-func */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { IResponse } from '@domains/IResponse';
import { LoginRequest, UserData } from '@domains/IUser';
import { HttpPaths } from '@/Enums/httpPaths';

export const login = async (
  req: LoginRequest,
): Promise<IResponse<UserData>> => {
  const response = await axios.post(HttpPaths.Api_Login, req);
  return response.data;
};

type ILoginReq = {
  onSuccess?: (
    data: IResponse<UserData>,
    variables: LoginRequest,
    context: any,
  ) => void;
  onError?: (err: Error) => void;
  onMutate?: (req: LoginRequest) => IResponse<UserData>;
};

export const useLogin = ({ onSuccess }: ILoginReq) => {
  const mutate = useMutation<
    IResponse<UserData>,
    Error,
    LoginRequest,
    () => void
  >({
    onSuccess,
    mutationFn: (a) => login(a),
  });
  return mutate;
};
