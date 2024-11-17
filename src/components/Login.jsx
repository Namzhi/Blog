import { useDispatch, useSelector } from 'react-redux'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Navigate, useNavigate } from 'react-router-dom'

import { loginUser, setUser } from 'store/slice/userSlice'

import { useAuth } from '../hooks/use-auth'

import { FormLogin } from './Form-login'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuth } = useAuth()

  return isAuth ? <Navigate to={'/'} /> : <FormLogin title="sign in" />
}
export { Login }
