import { createHashRouter } from 'react-router-dom';
import { Error404 } from '@modules/errors/Error404';
import { Error500 } from '@modules/errors/Error500';
import { Error403 } from '@modules/errors/Error403';
import AuthRoute from './AuthRoutes';
import MainRoute from './MainRoutes';

const router = createHashRouter([
  ...AuthRoute,
  ...MainRoute,
  {
    path: 'error-500',
    element: <Error500 />,
    index: true,
  },
  {
    path: 'error-403',
    element: <Error403 />,
    index: true,
  },
  {
    path: '*',
    element: <Error404 />,
  },
]);

export default router;
