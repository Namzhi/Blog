import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useAuth } from './hooks/use-auth'
import { removeUser } from './store/slice/userSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const { isAuth, email } = useAuth()
  return isAuth ? (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => dispatch(removeUser())}>Log out from {email} </button>
    </div>
  ) : (
    <Navigate to={'/login'} />
  )
}

export default HomePage
