import { Route, Routes, BrowserRouter } from 'react-router-dom'

import HomePage from '../HomePage'
import LoginPage from '../LoginPage'
import RegisterPage from '../RegisterPage'
import Pagination from '../Pagination'
import './App.scss'
import { ArticleList } from '../article-list/Article-list'
export const App = () => {
  return (
    <div className="App__wrapper">
      <div className="App__header">
        <div className="App__name">
          <span>Realworld Blog</span>
        </div>
        <div className="App__button-wrapper">
          <button className="App__sign-in">Sign in</button>
          <button className="App__sign-up">Sign up</button>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<ArticleList />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
      <Pagination />
    </div>
  )
}

export default App
