import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  email: null,
  username: null,
  token: localStorage.getItem('token'),
  password: null,
  loading: false,
  error: false,
  errorMessage: null,
  err: '',
  isAuth: false,
  image: null,
  isSave: null,
}
const api = 'https://blog-platform.kata.academy/api/'
export const registerUser = createAsyncThunk('users/registerUser', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api}/users`, user)
    const { token } = response.data.user
    localStorage.setItem('token', token)
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.status === 422 ? 'Login or email is' + ' not valid' : 'Failed to register') // Improved
  }
})
export const loginUser = createAsyncThunk('users/loginUser', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api}users/login`, user)
    const { token } = response.data.user

    localStorage.setItem('token', token)
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.status === 422 ? 'Login or password' + ' is' + ' not valid' : 'Failed to login') // Improved
    // Improved
  }
})
export const authUser = createAsyncThunk('users/authUser', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return rejectWithValue('No token found')
  }

  try {
    const response = await axios.get(`${api}user`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to authenticate')
  }
})
export const editProfile = createAsyncThunk('users/editProfile', async (user, { rejectWithValue }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return rejectWithValue('No token found')
  }

  try {
    const response = await axios.put(`${api}user`, user, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.status === 422 ? 'Login or email is' + ' not valid' : 'Failed to edit') // Improved
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

      localStorage.removeItem('token')
    },
    setUser(state, action) {
      state.email = action.payload
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
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = false
        state.errorMessage = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username
        state.token = action.payload.user.token
        state.email = action.payload.user.email
        state.isAuth = true
        state.bio = action.payload.user.bio || null
        state.image = action.payload.user.image || null
        state.loading = false
        state.errorMessage = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.payload
        state.loading = false
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = false
        state.errorMessage = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username
        state.token = action.payload.user.token
        state.email = action.payload.user.email
        state.isAuth = true
        state.bio = action.payload.user.bio
        state.image = action.payload.user.image
        state.loading = false
        state.errorMessage = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = true
        state.loading = false
        state.errorMessage = action.payload
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isAuth = true
        state.username = action.payload.user.username
        state.image = action.payload.user.image
        state.email = action.payload.user.email
        state.password = action.payload.user.password
        state.token = action.payload.user.token

        state.loading = false
      })
      .addCase(authUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(authUser.rejected, (state) => {
        state.loading = false
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.username = action.payload.user.username
        state.token = action.payload.user.token
        state.email = action.payload.user.email
        state.isAuth = true
        state.bio = action.payload.user.bio
        state.image = action.payload.user.image
        state.loading = false
        state.isSave = true
        state.errorMessage = false
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true
        state.error = false
        state.isSave = false
        state.errorMessage = false
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false
        state.isSave = false
        state.errorMessage = action.payload
      })
  },
})
export const { logout, setUser, removeUser } = userSlice.actions

export default userSlice.reducer
