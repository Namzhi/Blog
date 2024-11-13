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
  isAuth: false,
}

export const registerUser = createAsyncThunk('users/registerUser', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://blog-platform.kata.academy/api/users', user)
    console.log(response)
    return response.data
  } catch (err) {
    console.error(err)
    return rejectWithValue(err.response?.data || 'Invalid data') // Improved error handling
  }
})
export const loginUser = createAsyncThunk('users/loginUser', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://blog-platform.kata.academy/api/users/login', user)
    console.log(response)
    return response.data
  } catch (err) {
    console.error(err)
    console.error(err.data.user)
    return rejectWithValue(err.response?.data || 'Invalid data') // Improved error handling
  }
})
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
      })
  },
})
export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
