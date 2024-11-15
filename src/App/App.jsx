import { useRoutes, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import HomePage from '../HomePage'
import LoginPage from '../LoginPage'
import RegisterPage from '../RegisterPage'
import ArticlePost from '../Article-post/Article-post'
import './App.scss'
import { ArticleList } from '../Article-list/Article-list'
import profileImage from '../images/profile.svg'

// eslint-disable-next-line import/order
import axios from 'axios'
import { useAuth } from '../hooks/use-auth'
import { useProfile } from '../hooks/use-profile'
import { authUser, editProfile, logout, removeUser } from '../store/slice/userSlice'

// eslint-disable-next-line import/order
import { useDispatch, useSelector } from 'react-redux'
import Spin from '../Spin'
import ProfilePage from '../ProfilePage'

export const App = () => {
  const articleListElement = <ArticleList />
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const AppRoutes = () =>
    useRoutes([
      { path: '/', element: <ArticleList /> },
      { path: '/articles', element: <ArticleList /> },
      { path: '/articles/:slug', element: <ArticlePost /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ])
  const handleLogOut = () => {
    dispatch(logout())
  }
  const handleProfile = () => {
    navigate('/profile')
  }
  const handleNavigate = (nav) => {
    navigate(nav)
  }
  const { isAuth, isLoading } = useAuth()
  const { username, image } = useProfile()

  useEffect(() => {
    dispatch(authUser())
    // console.log('isAuth', isAuth)
  }, [dispatch])

  // console.log('isAuth', isAuth)
  return (
    <div className="App__wrapper">
      <div className="App__header">
        <div className="App__name" role="presentation" onClick={() => navigate('/')}>
          <span>Realworld Blog</span>
        </div>

        <div className="App__button-wrapper">
          {isLoading ? null : isAuth ? (
            <>
              <button className="App__create-article">Create article</button>

              <div className="profile__name" role="presentation" onClick={handleProfile}>
                {username}
              </div>
              <div className="profile__avatar" role="presentation" onClick={handleProfile}>
                {image ? <img src={image} alt="" className="" /> : <img src={profileImage} alt="" className="" />}
              </div>
              <button className="App__log-out" onClick={handleLogOut}>
                Log out
              </button>
            </>
          ) : (
            // isLoading ? null : !isAuth ?
            <>
              <button className="App__sign-in" onClick={() => navigate('/login')}>
                Sign in
              </button>
              <button className="App__sign-up" onClick={() => navigate('/register')}>
                Sign up
              </button>
            </>
          )}
        </div>
        {/*) : (*/}
        {/*<div className="App__button-wrapper">*/}
        {/*</div>*/}
        {/*)}*/}
      </div>
      <AppRoutes />
    </div>
  )
}

export default App
