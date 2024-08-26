import { Suspense } from 'react'
import './style.scss'
import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import ReactQueryProvider from './lib/QueryClientProvider'
import router from './routing'
import SplashScreen from '@modules/layout/splashScreen'

function App() {
  return (
    <Suspense fallback={<SplashScreen />}>
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
