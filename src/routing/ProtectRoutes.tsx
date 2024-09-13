/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { checkTokenCookie } from '@helpers/cookies';
import LockStyle from './Lock';

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
  let token = checkTokenCookie();
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
  return <LockStyle />;
}
