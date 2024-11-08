import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import LookupsData from '@modules/lookups/core/_lookupData';
import LookupsPage from '@modules/lookups/page/lookup';
import RolePage from '@modules/roles';
import ProtectRoutes from './ProtectRoutes';

const MainLayout = lazy(() => import('../modules/layout'));
const DashboardPage = lazy(() => import('../modules/dashboard'));
const SupplierPage = lazy(() => import('../modules/supplier'));
const UserPage = lazy(() => import('../modules/users'));
const ListingPage = lazy(() => import('../modules/listing'));
const ListingPackagePage = lazy(() => import('../modules/listingPackage'));
const CustomerPage = lazy(() => import('../modules/customers'));
const TransactioinsPage = lazy(() => import('../modules/transactoins'));
const SitConfigurationPage = lazy(() => import('../modules/siteConfigration'));

const MainRoute: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectRoutes auth>
            <DashboardPage />
          </ProtectRoutes>
        ),
        index: true,
      },
      {
        path: 'transactions',
        element: (
          <ProtectRoutes auth>
            <TransactioinsPage />
          </ProtectRoutes>
        ),
        index: true,
      },
      {
        path: 'customers',
        element: (
          <ProtectRoutes auth>
            <CustomerPage />
          </ProtectRoutes>
        ),
        index: true,
      },
      {
        path: 'roles',
        element: (
          <ProtectRoutes auth>
            <RolePage />
          </ProtectRoutes>
        ),
        index: true,
      },
      {
        path: 'users',
        element: (
          <ProtectRoutes auth>
            <UserPage />
          </ProtectRoutes>
        ),
        index: true,
      },
      {
        path: 'site-configuration',
        element: (
          <ProtectRoutes auth>
            <SitConfigurationPage />
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
      {
        path: 'listing-package',
        element: (
          <ProtectRoutes auth>
            <ListingPackagePage />
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
];

export default MainRoute;
