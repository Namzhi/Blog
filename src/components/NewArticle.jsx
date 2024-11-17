import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import React from 'react'

import { useAuth } from '../hooks/use-auth'

import { FormEdit } from './Form-edit'
import { FormArticle } from './Form-article'

// console.log(isAuth)
// return isAuth ? <FormEdit title="sign in" /> : <Navigate to={'/login'} />
const NewArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(isAuth)
  return <FormArticle title="edit" />
}
export { NewArticle }
