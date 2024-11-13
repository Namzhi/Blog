// eslint-disable-next-line import/order
import { useEffect, useState } from 'react'

// import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { useAuth } from '../hooks/use-auth'
import { loginUser } from '../store/slice/userSlice'

export const FormLogin = ({ title }) => {
  const dispatch = useDispatch()
  const { isAuth } = useAuth() // Get the isAuth status from useAuth
  const [email, setEmail] = useState('') // Local state for email
  const [pass, setPass] = useState('') // Local state for password

  const handleLogin = (event) => {
    event.preventDefault() // Prevent form from refreshing
    dispatch(
      loginUser({
        user: {
          email,
          password: pass,
        },
      })
    )
  }

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="password" />
      <button onClick={handleLogin}>{title}</button>
      {isAuth && <p>Login successful!</p>}
    </div>
  )
}
