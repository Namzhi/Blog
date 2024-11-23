import { Navigate } from 'react-router-dom'

import { useProfile } from '../hooks/use-profile'

const PrivateRoute = ({ children }) => {
  const { isAuth } = useProfile()

  return isAuth ? children : <Navigate to="/login" />
}
export { PrivateRoute }
