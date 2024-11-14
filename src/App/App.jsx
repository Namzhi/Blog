import { useRoutes, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import HomePage from '../HomePage'
import LoginPage from '../LoginPage'
import RegisterPage from '../RegisterPage'
import ArticlePost from '../Article-post/Article-post'
import './App.scss'
import { ArticleList } from '../Article-list/Article-list'

// eslint-disable-next-line import/order
import axios from 'axios'
import { useAuth } from '../hooks/use-auth'
import { authUser, logout, removeUser } from '../store/slice/userSlice'

// eslint-disable-next-line import/order
import { useDispatch, useSelector } from 'react-redux'
import Spin from '../Spin'

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
    ])
  const handleLogOut = () => {
    dispatch(logout())
  }
  const handleNavigate = (nav) => {
    navigate(nav)
  }
  const { isAuth, isLoading } = useAuth()
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
            <button className="App__log-out" onClick={handleLogOut}>
              Log out
            </button>
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
