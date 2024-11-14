import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { fetchArticles } from './articleSlice'

const initialState = {
  email: null,
  username: null,
  token: null,
  password: null,
  loading: false,
  error: false,
  errorMessage: null,
  err: '',
  isAuth: false,
}
const api = 'https://blog-platform.kata.academy/api/'
export const registerUser = createAsyncThunk('users/registerUser', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api}/users`, user)
    console.log(response)
    const { token } = response.data.user

    // Сохраняем токен в localStorage
    localStorage.setItem('token', token)
    return response.data
  } catch (err) {
    console.error(err)
    return rejectWithValue(err.response.status === 422 ? 'Login or email is' + ' not valid' : 'Failed to register') // Improved
    // error
    // handling
  }
})
export const loginUser = createAsyncThunk('users/loginUser', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api}users/login`, user)
    console.log(response)
    const { token } = response.data.user

    // Сохраняем токен в localStorage
    localStorage.setItem('token', token)
    return response.data
  } catch (err) {
    console.error(err)
    console.error(err.data.user)
    return rejectWithValue(err.response?.data || 'Failed to login') // Improved
    // error handling
  }
})
export const authUser = createAsyncThunk('users/authUser', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return rejectWithValue('No token found')
  }

  try {
    const response = await axios.get(`${api}articles`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log('errrr', err)
    return rejectWithValue(err.response?.data || 'Failed to authenticate')
  }
})
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.email = null
      state.username = null
      state.token = null
      state.isAuth = false

      // Удаляем токен из localStorage
      localStorage.removeItem('token')
    },
    setUser(state, action) {
      console.log(action)
      state.email = action.payload
      // state.token = action.payload.token
      // state.username = action.payload.username
    },
    removeUser(state) {
      state.email = null
      state.token = null
      state.username = null
      state.isAuth = false
      state.bio = null
      state.image = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username
        state.token = action.payload.user.token
        state.email = action.payload.user.email
        state.isAuth = true
        state.bio = action.payload.user.bio || null
        state.image = action.payload.user.image || null
        state.loading = false
        console.log(action.payload) // For debugging
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.error(action.payload, 'register rejected')
        state.error = true
        state.errorMessage = action.payload
        state.loading = false
      })
      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username
        state.token = action.payload.user.token
        state.email = action.payload.user.email
        state.isAuth = true
        state.bio = action.payload.user.bio
        state.image = action.payload.user.image
        state.loading = false

        console.log(action.payload) // For debugging
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error(action.payload, 'login rejected')
        state.error = true
        state.loading = false
        state.errorMessage = action.payload
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isAuth = true

        state.loading = false

        console.log(action.payload) // For debugging
      })
      .addCase(authUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(authUser.rejected, (state, action) => {
        // console.error(action.payload, 'auth rejected')
        // state.error = true
        state.loading = false
        // state.errorMessage = action.payload
      })
  },
})
export const { logout, setUser, removeUser } = userSlice.actions

export default userSlice.reducer
