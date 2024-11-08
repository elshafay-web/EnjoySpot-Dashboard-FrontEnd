/* eslint-disable no-unneeded-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import useAxiosInterceptors from '@apis/interceptor';

type Props = {
  children: React.ReactNode;
  auth?: boolean;
  permission?: any;
};

export default function ProtectRoutes({
  children,
  permission,
  auth = true,
}: Props) {
  useAxiosInterceptors();
  let token = localStorage.getItem('token') ? true : false;
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const externalParam = searchParams.get('token');
  if (externalParam) {
    token = true;
  }
  if (auth) {
    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
  if (!auth) {
    if (token) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }
  if (!token || !permission) {
    return children;
  }
}
