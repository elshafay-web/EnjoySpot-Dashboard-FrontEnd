import AuthPage from '@modules/auth'
import { RouteObject } from 'react-router-dom'

const AuthRoute: RouteObject[] = [
  {
    path: '/login',
    element: <AuthPage />,
  },
]

export default AuthRoute
