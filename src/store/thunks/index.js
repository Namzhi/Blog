import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchArticles = createAsyncThunk('articles/getArticles', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://blog-platform.kata.academy/api/articles?limit=${page * 5}&offset=${page * 5 - 5}`
    )
    return response.data
  } catch (err) {
    console.log(err)
    return rejectWithValue('The error occurred while fetching articles')
  }
})
const fetchOneArticle = createAsyncThunk('articles/getOneArticle', (slug) => {
  console.log(slug)
  return axios.get(`https://blog-platform.kata.academy/api/articles/${slug}`).then((response) => response.data)
})
const example = 3

export default fetchArticles
