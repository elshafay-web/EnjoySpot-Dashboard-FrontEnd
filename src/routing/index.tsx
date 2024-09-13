import { createHashRouter } from 'react-router-dom';
import AuthRoute from './AuthRoutes';
import MainRoute from './MainRoutes';

const router = createHashRouter([
  ...AuthRoute,
  ...MainRoute,
  {
    errorElement: <>error</>,
  },
]);

export default router;
