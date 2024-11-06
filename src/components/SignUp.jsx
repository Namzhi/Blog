import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { setUser } from 'store/slice/userSlice'

import { Form } from './Form'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleRegister = (email, password) => {
    const auth = getAuth()

    createUserWithEmailAndPassword(auth, email, password)
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
      .catch(console.error)
  }
  return <Form title="register" handleClick={handleRegister} />
}
export { SignUp }
