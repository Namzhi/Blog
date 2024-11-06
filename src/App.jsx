import { Route, Routes } from 'react-router-dom'

import HomePage from './HomePage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import './App.css'
export const App = () => {
  return (
    <Routes>
      <Route exact path="/" component={<HomePage />} />
      <Route exact path="/login" component={<LoginPage />} />
      <Route exact path="/register" component={<RegisterPage />} />
    </Routes>
  )
}

export default App
