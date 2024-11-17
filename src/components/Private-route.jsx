import { Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/use-auth'

// import { useAuth } from '../hooks/use-auth'
const PrivateRoute = ({ children }) => {
  const { isAuth, isLoading } = useAuth()
  // console.log(isLoading)

  // if (!isAuth && !isLoading) {
  //   return <Navigate to="/login" replace />
  // }

  return isAuth ? children : <Navigate to="/login" />
}
export { PrivateRoute }
