import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import React from 'react'

import { useAuth } from '../hooks/use-auth'

import { FormEdit } from './Form-edit'
import { FormArticleEdit } from './Form-article-edit'

// console.log(isAuth)
// return isAuth ? <FormEdit title="sign in" /> : <Navigate to={'/login'} />
const EditArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(isAuth)
  return <FormArticleEdit title="editArticle" />
}
export { EditArticle }
