import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { registerUser } from 'store/slice/userSlice'

import { useAuth } from '../hooks/use-auth'

import { FormRegister } from './Form-register'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuth, email } = useAuth()
  // const isAuth = useSelector((state) => state.user.isAuth)
  // console.log(isAuth)

  const handleRegister = (username, email, password) => {
    dispatch(
      registerUser({
        user: {
          username: username,
          email: email,
          password: password,
        },
      })
    )
    // console.log(isAuth, email)
  }

  return !isAuth ? <FormRegister title="register" handleClick={handleRegister} /> : <Navigate to={'/'} />
}
export { SignUp }
