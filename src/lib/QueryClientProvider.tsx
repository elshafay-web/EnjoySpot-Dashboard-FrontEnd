/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { setCookie } from '@/helpers/cookies'

function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: async (error: any) => {
              if (error?.response?.status === 401) {
                setCookie('token', undefined, true)
                window.location.reload()
              }
              toast.error(
                error.response?.data.Message || error.message || error.Message
              )
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error: any) => {
            if (error?.response?.status === 401) {
              setCookie('token', '', true)
              window.location.reload()
            }
            toast.error(
              error.response?.data.Message || error.message || error.Message
            )
          },
        }),
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
