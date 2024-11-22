import React from 'react'
import ReactDOM from 'react-dom/client'
import { thunk } from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { composeWithDevTools } from '@redux-devtools/extension'

import './index.css'
import './variables.scss'
import './mixins.scss'
import App from './App/App'
import { store } from './store'

// const rootStore = createStore(store, composeWithDevTools(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
