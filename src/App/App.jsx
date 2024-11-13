import { useRoutes, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'

import HomePage from '../HomePage'
import LoginPage from '../LoginPage'
import RegisterPage from '../RegisterPage'
import ArticlePost from '../Article-post/Article-post'
import './App.scss'
import { ArticleList } from '../Article-list/Article-list'

// eslint-disable-next-line import/order
import axios from 'axios'
import { useAuth } from '../hooks/use-auth'
import { removeUser } from '../store/slice/userSlice'

// eslint-disable-next-line import/order
import { useDispatch } from 'react-redux'
export const App = () => {
  const articleListElement = <ArticleList />
  const navigate = useNavigate()
  const { isAuth } = useAuth()
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
    dispatch(removeUser())
  }
  const handleNavigate = (nav) => {
    navigate(nav)
  }

  return (
    <div className="App__wrapper">
      <div className="App__header">
        <div className="App__name" role="presentation" onClick={() => navigate('/')}>
          <span>Realworld Blog</span>
        </div>
        {!isAuth ? (
          <div className="App__button-wrapper">
            <button className="App__sign-in" onClick={() => navigate('/login')}>
              Sign in
            </button>

            <button className="App__sign-up" onClick={() => navigate('/register')}>
              Sign up
            </button>
          </div>
        ) : (
          <div className="App__button-wrapper">
            <button className="App__log-out" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        )}
      </div>
      <AppRoutes />
    </div>
  )
}

export default App
