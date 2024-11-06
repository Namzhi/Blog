import { Route, Routes, BrowserRouter } from 'react-router-dom'

import HomePage from './HomePage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import './App.css'
import { ArticleList } from './Article-list'
export const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<ArticleList />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
