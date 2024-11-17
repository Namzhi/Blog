import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// import fetchArticles from '../thunks'
const initialState = {
  articles: [],
  articlesCount: 0,
  oneArticle: {},
  loading: false,
  error: false,
  tags: [],
}
const api = 'https://blog-platform.kata.academy/api/'

// console.log(fetchArticles)
export const fetchArticles = createAsyncThunk('articles/getArticles', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://blog-platform.kata.academy/api/articles?limit=${5}&offset=${page * 5 - 5}`
    )
    return response.data
  } catch (err) {
    return rejectWithValue('The error occurred while fetching articles')
  }
})

export const fetchOneArticle = createAsyncThunk('articles/getOneArticle', async (slug, { rejectWithValue }) => {
  try {
    const response = await axios
      .get(`https://blog-platform.kata.academy/api/articles/${slug}`)
      .then((response) => response.data)
    return response
  } catch (err) {
    return rejectWithValue('The error occurred while fetching an article')
  }
})
export const createArticle = createAsyncThunk('articles/createArticle', async (article, { rejectWithValue }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return rejectWithValue('No token found')
  }

  try {
    const response = await axios.post(`${api}articles`, article, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log('errrr', err)
    return rejectWithValue(err.response?.data || 'Failed to create an article')
  }
})
export const editArticle = createAsyncThunk('articles/:slug', async (article, { rejectWithValue }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return rejectWithValue('No token found')
  }
  console.log(article.article)
  try {
    const response = await axios.put(`${api}articles/${article.article.slug}`, article, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log('errrr', err)
    return rejectWithValue(err.response?.data || 'Failed to create an article')
  }
})
export const deleteArticle = createAsyncThunk('articles/delete/:slug', async (slug, { rejectWithValue }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return rejectWithValue('No token found')
  }
  console.log(slug)
  try {
    const response = await axios.delete(`${api}articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log('errrr', err)
    return rejectWithValue(err.response?.data || 'Failed to delete the article')
  }
})
const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state, action) => {
      state.loading = true
      state.error = false
    })
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles
      state.articlesCount = action.payload.articlesCount
      state.loading = false
      state.error = false
    })
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.articles = []
      state.articlesCount = 0

      state.error = action.payload
      state.loading = false
    })
    builder.addCase(fetchOneArticle.pending, (state, action) => {
      state.loading = true
      state.error = false
    })
    builder.addCase(fetchOneArticle.fulfilled, (state, action) => {
      state.oneArticle = action.payload.article
      state.loading = false
      state.error = false
    })
    builder.addCase(fetchOneArticle.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })

    // removeUser(state) {
    //   state.email = null
    //   state.token = null
    //   state.id = null
    // },
  },
})

export const { setUser, removeUser } = articleSlice.actions

export default articleSlice.reducer
// module.exports.fetchArticles = fetchArticles
