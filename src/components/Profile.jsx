import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import React from 'react'

import { useAuth } from '../hooks/use-auth'

import { FormEdit } from './Form-edit'

// console.log(isAuth)
// return isAuth ? <FormEdit title="sign in" /> : <Navigate to={'/login'} />
const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuth } = useAuth()
  return isAuth ? <FormEdit title="edit" /> : <Navigate to={'/login'} />
}
export { Profile }
