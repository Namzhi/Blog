import { useDispatch, useSelector } from 'react-redux'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { setUser } from 'store/slice/userSlice'

import { Form } from './Form'
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (email, password) => {
    const auth = getAuth()
    console.log(auth)
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user)
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        )
        navigate('/')
      })
      .catch(() => alert('Invalid user'))
  }
  return <Form title="sign in" handleClick={handleLogin} />
}
export { Login }
