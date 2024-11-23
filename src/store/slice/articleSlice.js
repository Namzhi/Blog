import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  articles: [],
  articlesCount: 0,
  oneArticle: {},
  loading: false,
  error: false,
  tags: [],
  title: '',
  description: '',
  body: '',
  errorMessage: false,
  isSave: false,
  isCreated: false,
  ableEdit: false,
  favoritesCount: null,
  favorited: null,
  updatedArticle: null,
}
const api = 'https://blog-platform.kata.academy/api/'
const token = localStorage.getItem('token')
export const fetchArticles = createAsyncThunk('articles/getArticles', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api}articles?limit=${5}&offset=${page * 5 - 5}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return rejectWithValue('The error occurred while fetching articles')
  }
})

export const fetchOneArticle = createAsyncThunk('articles/getOneArticle', async (slug, { rejectWithValue }) => {
  try {
    return await axios
      .get(`${api}articles/${slug}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => response.data)
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
    return response.data
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to create an article')
  }
})
export const editArticle = createAsyncThunk('articles/:slug', async (article, { rejectWithValue }) => {
  if (!token) {
    return rejectWithValue('No token found')
  }
  try {
    const response = await axios.put(`${api}articles/${article.article.slug}`, article, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return rejectWithValue(
      err.response.status === 403 ? 'No rights to edit' : 'Failed' + ' to' + ' edit' + ' the article'
    )
  }
})
export const likeArticle = createAsyncThunk('articles/:slug/like', async (slug, { rejectWithValue }) => {
  if (!token) {
    return rejectWithValue('No token found')
  }

  try {
    const response = await axios.post(
      `${api}articles/${slug}/favorite`,
      null, // No body required
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    return response.data // Return the updated article
  } catch (err) {
    return rejectWithValue(err.response?.status === 403 ? 'No rights to like' : 'Failed to like the article')
  }
})
export const unlikeArticle = createAsyncThunk('articles/:slug/unlike', async (slug, { rejectWithValue }) => {
  if (!token) {
    return rejectWithValue('No token found')
  }

  try {
    const response = await axios.delete(`${api}articles/${slug}/favorite`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response.data // Return the updated article
  } catch (err) {
    return rejectWithValue(err.response?.status === 403 ? 'No rights to like' : 'Failed to like the article')
  }
})
export const deleteArticle = createAsyncThunk('articles/delete/:slug', async (slug, { rejectWithValue }) => {
  if (!token) {
    return rejectWithValue('No token found')
  }
  try {
    const response = await axios.delete(`${api}articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to delete the article')
  }
})
const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    deleteError(state) {
      state.error = null
      state.errorMessage = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true
      state.error = false
    })
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles
      state.articlesCount = action.payload.articlesCount
      state.loading = false
      state.error = false
      state.isCreated = false
    })
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.articles = []
      state.articlesCount = 0

      state.error = action.payload
      state.loading = false
    })
    builder.addCase(fetchOneArticle.pending, (state) => {
      state.loading = true
      state.error = false
    })
    builder.addCase(fetchOneArticle.fulfilled, (state, action) => {
      state.oneArticle = action.payload.article
      state.loading = false
      state.error = false
      state.title = action.payload.article.title
      state.description = action.payload.article.description
      state.body = action.payload.article.body
      state.tags = action.payload.article.tagList
      state.errorMessage = false
      state.isSave = false
    })
    builder.addCase(fetchOneArticle.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(createArticle.pending, (state) => {
      state.loading = true
      state.error = false
      state.errorMessage = false
      state.isCreated = false
    })
    builder.addCase(createArticle.fulfilled, (state) => {
      state.loading = false
      state.error = false
      state.errorMessage = false

      state.isCreated = true
    })
    builder.addCase(createArticle.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
      state.errorMessage = action.payload
      state.isCreated = false
    })

    builder.addCase(deleteArticle.fulfilled, (state) => {
      state.loading = false
      state.error = false
      state.errorMessage = false

      state.isDeleted = true
    })
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
      state.errorMessage = action.payload
      state.isDeleted = false
    })
    builder.addCase(editArticle.pending, (state) => {
      state.loading = true
      state.error = false
      state.errorMessage = false
      state.isSave = false
    })
    builder.addCase(editArticle.fulfilled, (state) => {
      state.loading = false
      state.error = false
      state.errorMessage = false
      state.isSave = true
    })
    builder.addCase(editArticle.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
      state.errorMessage = action.payload
      state.isSave = false
    })
    builder.addCase(likeArticle.pending, () => {})
    builder.addCase(likeArticle.fulfilled, (state, action) => {
      state.loading = false
      const updatedArticle = action.payload.article // Assuming API returns
      const index = state.articles.findIndex((item) => item.slug === updatedArticle.slug)
      if (index !== -1) {
        state.articles[index].favorited = updatedArticle.favorited
        state.articles[index].favoritesCount = updatedArticle.favoritesCount
      }
      state.oneArticle = updatedArticle
    })
    builder.addCase(likeArticle.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
      state.errorMessage = action.payload
    })
    builder.addCase(unlikeArticle.fulfilled, (state, action) => {
      const updatedArticle = action.payload.article // Assuming API returns
      const index = state.articles.findIndex((item) => item.slug === updatedArticle.slug)
      if (index !== -1) {
        state.articles[index].favorited = updatedArticle.favorited
        state.articles[index].favoritesCount = updatedArticle.favoritesCount
      }
      state.oneArticle = updatedArticle
    })
    builder.addCase(unlikeArticle.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
      state.errorMessage = action.payload
    })
  },
})

export const { deleteError } = articleSlice.actions
export default articleSlice.reducer
