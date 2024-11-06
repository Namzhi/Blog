import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <p>
        Or <Link to="/register">register</Link>
      </p>
    </div>
  )
}
export default LoginPage
