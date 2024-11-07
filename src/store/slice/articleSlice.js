import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  articles: [],
  articlesCount: 0,
}
export const fetchArticles = createAsyncThunk('articles/getArticles', (page) => {
  console.log(page)
  return axios.get('https://blog-platform.kata.academy/api/articles').then(
    (response) => response.data.articles
    // .data.map((el) => {
    // console.log(el)
    // })
  )
})
//   const response = await fetch('https://blog-platform.kata.academy/api/articles')
//   if (!response.ok) {
//     throw new Error('Failed to fetch articles')
//   }
//   // const jsonData =
//   return await response.json()
// } catch (error) {
//   return rejectWithValue(error.message)
// }

const articleSlice = createSlice({
  name: 'article',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state, action) => {
      // state.articles = action.payload
      // console.log(action.payload)
      // console.log(state)
    })
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload
      // console.log(action.payload)
      // console.log(state)
    })
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.articles = []
      // console.log(action.payload)
      // console.log(state)
    })
    // getArticles(state, action) {
    //   return async function (dispatch) {
    //     const response = await fetch('https://blog-platform.kata.academy/api/articles')
    //     const jsonData = await response.json()
    //     state.articles = jsonData
    //   }
    // },
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
