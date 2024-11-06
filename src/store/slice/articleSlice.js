import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articles: [],
  articlesCount: 0,
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    getArticles(state, action) {
      return async function (dispatch) {
        const response = await fetch('https://blog-platform.kata.academy/api/articles')
        const jsonData = await response.json()
        state.articles = jsonData
      }
    },
    removeUser(state) {
      state.email = null
      state.token = null
      state.id = null
    },
  },
})

export const { setUser, removeUser } = articleSlice.actions

export default articleSlice.reducer
