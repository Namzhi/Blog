import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Navigate, useNavigate } from 'react-router-dom'

import { Profile } from 'components/Profile'

import { FormEdit } from './components/Form-edit'
import { FormLogin } from './components/Form-login'

const ProfilePage = () => {
  return (
    <div>
      <h1>Profile</h1>
      <Profile />
      <p>{/*Or <Link to="/profile">profile</Link>*/}</p>
    </div>
  )
}
export default ProfilePage
