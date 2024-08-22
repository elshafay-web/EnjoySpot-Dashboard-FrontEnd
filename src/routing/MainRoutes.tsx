import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import ProtectRoutes from './ProtectRoutes'
import LookupsData from '@modules/lookups/core/_lookupData'
import LookupsPage from '@modules/lookups/page/lookup'

const MainLayout = lazy(() => import('../modules/layout'))
const DashboardPage = lazy(() => import('../modules/dashboard'))
const SupplierPage = lazy(() => import('../modules/supplier'))
const ListingPage = lazy(() => import('../modules/listing'))

const MainRoute: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectRoutes auth>
            <DashboardPage />
          </ProtectRoutes>
        ),
        index: true,
      },
      {
        path: 'suppliers',
        element: (
          <ProtectRoutes auth>
            <SupplierPage />
          </ProtectRoutes>
        ),
        index: true,
      },
      {
        path: 'listing',
        element: (
          <ProtectRoutes auth>
            <ListingPage />
          </ProtectRoutes>
        ),
        index: true,
      },
      ...LookupsData.map((elem) => ({
        path: elem.routing,
        element: (
          <ProtectRoutes auth>
            <LookupsPage obj={elem} className={elem.className} />
          </ProtectRoutes>
        ),
      })),
    ],
  },
]

export default MainRoute
