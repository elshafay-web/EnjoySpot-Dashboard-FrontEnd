import { Suspense } from 'react'
import useAxiosInterceptors from './apis/interceptor'
import './style.scss'
import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import ReactQueryProvider from './lib/QueryClientProvider'
import router from './routing'
function App() {
  useAxiosInterceptors()
  return (
    <Suspense fallback={<h1>loading..</h1>}>
      <ReactQueryProvider>
        <PrimeReactProvider value={{ unstyled: false }}>
          <RouterProvider router={router} />
        </PrimeReactProvider>
      </ReactQueryProvider>
      <Toaster
        richColors
        className="toaster"
        position="top-center"
        offset={5}
      />
    </Suspense>
  )
}
export default App
