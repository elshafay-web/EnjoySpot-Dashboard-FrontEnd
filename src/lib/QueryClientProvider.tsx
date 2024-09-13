/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { setCookie } from '@/helpers/cookies';

function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: async (error: any) => {
              if (error.response.status === 401) {
                setCookie('token', undefined);
                toast.error('انتهت الجلسة الخاصة بك برجاء تسجيل الدخول من جديد');
                window.location.reload();
              } else if (error.response.status === 404) {
                toast.error('هذه الصفحة غير موجودة');
              } else if (error.response.status === 400) {
                toast.error(
                  Object.values(error.response.data.errors).flat().join('\n'),
                );
              } else if (error.response.status === 403) {
                toast.error('ليس لديك صلاحية الدخول');
              } else {
                toast(error.message);
              }
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error: any) => {
            if (error.response.status === 401) {
              setCookie('token', undefined);
              toast.error('انتهت الجلسة الخاصة بك برجاء تسجيل الدخول من جديد');
              window.location.reload();
            } else if (error.response.status === 404) {
              toast.error('هذه الصفحة غير موجودة');
            } else if (error.response.status === 400) {
              if (
                error.response.data.errors &&
                error.response.data.errors.length > 0
              ) {
                let combinedMessage = '';
                for (const key in error.response.data.errors) {
                  if (error.response.data.errors.hasOwnProperty(key)) {
                    combinedMessage +=
                      `${error.response.data.errors[key].join(', ')} `;
                  }
                }
                toast.error(combinedMessage.trim());
              } else {
                toast.error(error.error.Message);
              }
            } else if (error.response.status === 403) {
              toast.error('ليس لديك صلاحية الدخول');
            } else {
              toast(error.message);
            }
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
