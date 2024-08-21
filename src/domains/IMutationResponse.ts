import { MutationOptions } from "@tanstack/react-query";

export type UseMutationHookOptions<
  TData = any,
  TError = Error,
  TVariables = void,
  TContext = unknown
> = {
  onSuccess?: MutationOptions<TData, TError, TVariables, TContext>['onSuccess'];
  onError?: MutationOptions<TData, TError, TVariables, TContext>['onError'];
  onMutate?: MutationOptions<TData, TError, TVariables, TContext>['onMutate'];
};