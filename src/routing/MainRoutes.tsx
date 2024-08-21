import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import ProtectRoutes from './ProtectRoutes'

const MainLayout = lazy(() => import('../modules/layout'))
const DashboardPage = lazy(() => import('../modules/dashboard'))
const SupplierPage = lazy(() => import('../modules/supplier'))

const MainRoute: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path:'dashboard',
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
    ],
  },
]

export default MainRoute
