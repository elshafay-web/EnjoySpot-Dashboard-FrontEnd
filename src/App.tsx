import { Suspense } from 'react';
import './style.scss';
import { Toaster } from 'sonner';
import { RouterProvider } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import SplashScreen from '@modules/layout/splashScreen';
import ReactQueryProvider from './lib/QueryClientProvider';
import router from './routing';

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
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcBNvhTn41CVismsIzNM3Fr7ztlE73DRc&loading=async&libraries=places"
        async
      />
    </Suspense>
  );
}
export default App;
