import { useRoutes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import ArticlePost from '../Article-post/Article-post'
import './App.scss'
import { ArticleList } from '../Article-list/Article-list'
import profileImage from '../assets/images/profile.svg'
import { PrivateRoute } from '../Private-route/Private-route'
import { useProfile } from '../hooks/use-profile'
import { authUser, logout } from '../store/slice/userSlice'
import { NewArticle } from '../New-article/NewArticle'
import { EditArticle } from '../Edit-article/Edit-article'
import { EditProfile } from '../Edit-profile/Edit-profile'
import { RegisterForm } from '../Register-form/Register-form'
import { LoginForm } from '../Login-form/Login-form'

export const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuth, isLoading, username, image } = useProfile()

  useEffect(() => {
    dispatch(authUser())
  }, [dispatch])

  const AppRoutes = () =>
    useRoutes([
      { path: '/', element: <ArticleList /> },
      { path: '/articles', element: <ArticleList /> },
      { path: '/articles/:slug', element: <ArticlePost /> },
      {
        path: '/login',
        element: <LoginForm />,
      },
      { path: '/register', element: <RegisterForm /> },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/new-article',
        element: (
          <PrivateRoute>
            <NewArticle />
          </PrivateRoute>
        ),
      },
      {
        path: '/articles/:slug/edit',
        element: (
          <PrivateRoute>
            <EditArticle />
          </PrivateRoute>
        ),
      },
    ])
  const handleLogOut = () => {
    dispatch(logout())
  }
  const handleProfile = () => {
    navigate('/profile')
  }

  function handleCreateArticle() {
    navigate('/new-article')
  }

  return (
    <div className="App__wrapper">
      <div className="App__header">
        <div className="App__name" role="presentation" onClick={() => navigate('/')}>
          <span>Realworld Blog</span>
        </div>

        <div className="App__button-wrapper">
          {isLoading ? null : isAuth ? (
            <>
              <button className="App__create-article" onClick={handleCreateArticle}>
                Create article
              </button>

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
      </div>
      <AppRoutes />
    </div>
  )
}

export default App
